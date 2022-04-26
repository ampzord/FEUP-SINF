var express = require('express');
var router = express.Router();
const primavera = require('../primavera')
const { isLoggedIn } = require('../middleware')

router.use(isLoggedIn)

router.get('/', function(req, res) {
  primavera.produtos(req.session.primavera.access_token)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/:id', function(req, res) {
  primavera.produto(req.session.primavera.access_token, req.params.id)
  .then(response => {
    const result = JSON.parse(response)
    if (result === null) {
      res.status(404).send('Product not found')
    } else {
      res.status(200).json(result)
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/:id/sales', function(req, res) {
  primavera.produto_vendas(req.session.primavera.access_token, req.session.user.primavera_id, req.params.id)
  .then(response => {
    const result = JSON.parse(response)
    if (result === null) {
      res.status(404).send('Product not found')
    } else {
      res.status(200).json(result.DataSet.Table)
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/:id/stock', function(req, res) {
  primavera.produto_stocks(req.session.primavera.access_token, req.params.id)
  .then(response => {
    const result = JSON.parse(response)
    if (result === null) {
      res.status(404).send('Product not found')
    } else {
      res.status(200).json(result.DataSet.Table[0])
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

module.exports = router;
