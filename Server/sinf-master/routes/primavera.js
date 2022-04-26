var express = require('express');
var router = express.Router();
const utils = require('../utils')
const primavera = require('../primavera')
const { isLoggedIn } = require('../middleware')

router.use(isLoggedIn)

router.post('/query', function(req, res) {
  if (!utils.hasFields(req.body, ['query'])) {
    res.status(400).send('Required body params: query')
    return
  }

  primavera.query(req.session.primavera.access_token, req.body.query)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/token', function(req, res) {
  primavera.token()
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/clientes', function(req, res) {
  primavera.clientes(req.session.primavera.access_token, req.session.user.primavera_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/cliente', function(req, res) {
  if (!utils.hasFields(req.body, ['client_id'])) {
    res.status(400).send('Required body params: client_id')
    return
  }

  primavera.cliente(req.session.primavera.access_token, req.body.client_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/produtos', function(req, res) {
  primavera.produtos(req.session.primavera.access_token)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/produto', function(req, res) {
  if (!utils.hasFields(req.body, ['product_id'])) {
    res.status(400).send('Required body params: product_id')
    return
  }

  primavera.produto(req.session.primavera.access_token, req.body.product_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/produto_vendas', function(req, res) {
  if (!utils.hasFields(req.body, ['product_id'])) {
    res.status(400).send('Required body params: product_id')
    return
  }

  primavera.produto_vendas(req.session.primavera.access_token, req.body.product_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/orcamentos', function(req, res) {
  primavera.orcamentos(req.session.primavera.access_token, req.session.user.primavera_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/encomendas', function(req, res) {
  primavera.encomendas(req.session.primavera.access_token, req.session.user.primavera_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/faturas', function(req, res) {
  primavera.encomendas(req.session.primavera.access_token, req.session.user.primavera_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/orcamentos_cliente', function(req, res) {
  if (!utils.hasFields(req.body, ['client_id'])) {
    res.status(400).send('Required body params: client_id')
    return
  }

  primavera.orcamentos_cliente(req.session.primavera.access_token, req.session.user.primavera_id, req.body.client_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/encomendas_cliente', function(req, res) {
  if (!utils.hasFields(req.body, ['client_id'])) {
    res.status(400).send('Required body params: client_id')
    return
  }

  primavera.encomendas_cliente(req.session.primavera.access_token, req.session.user.primavera_id, req.body.client_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/faturas_cliente', function(req, res) {
  if (!utils.hasFields(req.body, ['client_id'])) {
    res.status(400).send('Required body params: client_id')
    return
  }

  primavera.faturas_cliente(req.session.primavera.access_token, req.session.user.primavera_id, req.body.client_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

module.exports = router;
