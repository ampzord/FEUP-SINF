var express = require('express');
var router = express.Router();
const moment = require('moment')
const utils = require('../utils')
const { Agenda } = require('../database')
const primavera = require('../primavera')
const { isLoggedIn } = require('../middleware')
const _ = require('lodash')

router.use(isLoggedIn)

router.get('/', function(req, res) {
  Agenda.findAll({ where: { userId: req.session.user.id }, order: [['id', 'DESC']] })
  .then(agenda => {
    if (req.query.today === 'true') {
      agenda = _.filter(agenda, o => {
        return moment().isSame(o.visit_date, 'day') && !o.done
      })
    }
    
    res.status(200).json(agenda)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/', function(req, res) {
  if (!utils.hasFields(req.body, ['client_id', 'client_name', 'client_address', 'todo', 'visit_date'])) {
    res.status(400).send('Bad Request')
    return
  }

  Agenda.create({
    userId: req.session.user.id,
    client_id: req.body.client_id,
    client_name: req.body.client_name,
    client_address: req.body.client_address,
    todo: req.body.todo,
    visit_date: req.body.visit_date
  })
  .then(visit => {
    res.status(200).json(visit)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/:id', function(req, res) {
  Agenda.findByPk(req.params.id)
  .then(visit => {
    visit.userId == req.session.user.id ?
      res.status(200).json(visit) :
      res.status(403).send('Forbidden')
  })
  .catch(error => {
    console.error(error)
    res.status(404).send('Not Found')
  })
});

router.post('/:id', function(req, res) {
  if (!utils.hasFields(req.body, ['report', 'done'])) {
    res.status(400).send('Bad Request')
    return
  }

  Agenda.findByPk(req.params.id)
  .then(visit => {
    visit
      .update({ report: req.body.report, done: req.body.done })
      .then(() => res.status(200).json(visit))
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/:id/opportunity', function(req, res) {
  if (!utils.hasFields(req.body, ['rows'])) {
    res.status(400).send('Bad Request')
    return
  }

  Agenda.findByPk(req.params.id)
  .then(visit => {
    primavera.existe_oportunidade(req.session.primavera.access_token, visit.client_id)
    .then(response => {
      const exists = JSON.parse(response)
      if (!exists) {
        return primavera.cria_oportunidade(req.session.primavera.access_token, req.session.user.primavera_id, visit.client_id)
      }
    })
    .then(() => {
      return primavera.oportunidade(req.session.primavera.access_token, visit.client_id)
    })
    .then(response => {
      const opp = JSON.parse(response)
      return primavera.cria_oportunidade_orcamento(req.session.primavera.access_token, opp.ID, Math.floor(Math.random() * (30000 - 5 + 1)) + 5, req.body.rows)
    })
    .then(() => {
      res.status(200).send('Quotation created!')
    })
    .catch(error => {
      console.error(error)
      res.status(500).send('Internal Server Error')
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

module.exports = router;
