var express = require('express');
var router = express.Router();
const primavera = require('../primavera')
const { isLoggedIn } = require('../middleware')

router.use(isLoggedIn)

router.get('/', function(req, res) {
  primavera.clientes(req.session.primavera.access_token, req.session.user.primavera_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/', function(req, res) {
  primavera.cria_cliente(req.session.primavera.access_token, { ...req.body, Vendedor: req.session.user.primavera_id })
  .then(() => {
    res.status(200).send('Client created')
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/:id', function(req, res) {
  primavera.cliente(req.session.primavera.access_token, req.params.id)
  .then(response => {
    const result = JSON.parse(response)
    if (result === null) {
      res.status(404).send('Client not found')
    } else {
      res.status(200).json(result)
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/:id/quotations', function(req, res) {
  primavera.orcamentos_cliente(req.session.primavera.access_token, req.session.user.primavera_id, req.params.id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/:id/orders', function(req, res) {
  primavera.encomendas_cliente(req.session.primavera.access_token, req.session.user.primavera_id, req.params.id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/:id/invoices', function(req, res) {
  primavera.faturas_cliente(req.session.primavera.access_token, req.session.user.primavera_id, req.params.id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/:id/agenda', function(req, res) {
  Agenda.findAll({ where: { userId: req.session.user.id, client_id: req.params.id } })
  .then(agenda => {
    res.status(200).json(agenda)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

module.exports = router;
