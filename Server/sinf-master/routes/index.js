var express = require('express')
var router = express.Router()
const primavera = require('../primavera')
const utils = require('../utils')
const { User } = require('../database')
const { isLoggedIn } = require('../middleware')

router.get('/test', function(req, res) {
  res.status(200).send('Connection successful')
})

router.post('/login', function(req, res) {
  const needsBody = ['username', 'password']

  if (!utils.hasFields(req.body, needsBody)) {
    res.status(400).send('Bad Request. Needed values in request body: ' + needsBody.join())
    return
  }

  User.findOne({
    attributes: ['id', 'username', 'name', 'primavera_id'],
    where: { username: req.body.username, password: req.body.password }
  })
  .then(user => {
    if (!user) {
      res.status(422).send('Unprocessable Entity. Wrong credentials')
      return
    }

    primavera.token()
    .then(response => {
      req.session.user = user
      req.session.primavera = JSON.parse(response)
      res.status(200).json(user)
    })
    .catch(error => {
      console.error(error)
      res.status(500).send('Internal Server Error.')
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error.')
  })
})

router.get('/current_user', isLoggedIn, function(req, res) {
  User.findOne({
    attributes: ['id', 'username', 'name', 'primavera_id'],
    where: { id: req.session.user.id }
  })
  .then(user => {
    if (!user) {
      res.status(404).send('Not Found.')
      return
    }

    res.status(200).json(user)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error.')
  })
})

router.post('/query', isLoggedIn, function(req, res) {
  if (!utils.hasFields(req.body, ['query'])) {
    res.status(400).send('Bad Request. Needed values in request body: query')
    return
  }

  primavera.query(req.session.primavera.access_token, req.body.query)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error.')
  })
})

module.exports = router
