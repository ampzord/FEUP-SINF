var express = require('express');
var router = express.Router();
const primavera = require('../primavera')
const { isLoggedIn } = require('../middleware')
const utils = require('../utils')

router.use(isLoggedIn)

router.get('/quotations', function(req, res) {
  primavera.orcamentos(req.session.primavera.access_token, req.session.user.primavera_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/quotations', function(req, res) {
  if (!utils.hasFields(req.body, ['rows', 'client_id'])) {
    res.status(400).send('Bad Request')
    return
  }

  primavera.cria_orcamento(req.session.primavera.access_token, req.body)
  .then(response => {
    const created = JSON.parse(response)

    if (created) {
      res.status(200).send('Quotation created')
    } else {
      res.status(500).send('Couldn\'t create the document')
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/quotations/:id', function(req, res) {
  if (!utils.hasFields(req.body, ['document_number', 'client_id'])) {
    res.status(400).send('Bad Request')
    return
  }

  primavera.transforma_orcamento(req.session.primavera.access_token, req.body.document_number, req.body.client_id)
  .then(response => {
    const created = JSON.parse(response)

    if (created) {
      res.status(200).send('Quotation transformed')
    } else {
      res.status(500).send('Couldn\'t transform the document')
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/orders', function(req, res) {
  primavera.encomendas(req.session.primavera.access_token, req.session.user.primavera_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/orders', function(req, res) {
  if (!utils.hasFields(req.body, ['rows', 'client_id'])) {
    res.status(400).send('Bad Request')
    return
  }

  primavera.cria_encomenda(req.session.primavera.access_token, req.body)
  .then(response => {
    const created = JSON.parse(response)
    
    if (created) {
      res.status(200).send('Order created')
    } else {
      res.status(500).send('Couldn\'t create the document')
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/orders/:id', function(req, res) {
  if (!utils.hasFields(req.body, ['document_number', 'client_id'])) {
    res.status(400).send('Bad Request')
    return
  }

  primavera.transforma_encomenda(req.session.primavera.access_token, req.body.document_number, req.body.client_id)
  .then(response => {
    const created = JSON.parse(response)

    if (created) {
      res.status(200).send('Order transformed')
    } else {
      res.status(500).send('Couldn\'t transform the document')
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/invoices', function(req, res) {
  primavera.faturas(req.session.primavera.access_token, req.session.user.primavera_id)
  .then(response => {
    const result = JSON.parse(response)
    res.status(200).json(result.DataSet.Table)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.post('/invoices', function(req, res) {
  if (!utils.hasFields(req.body, ['rows', 'client_id'])) {
    res.status(400).send('Bad Request')
    return
  }

  primavera.cria_fatura(req.session.primavera.access_token, req.body)
  .then(response => {
    const created = JSON.parse(response)
    
    if (created) {
      res.status(200).send('Order created')
    } else {
      res.status(500).send('Couldn\'t create the document')
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

router.get('/document/:id', function(req, res) {
  primavera.documento(req.session.primavera.access_token, req.params.id)
  .then(response => {
    let header = JSON.parse(response[0]).DataSet.Table[0],
        rows = JSON.parse(response[1]).DataSet.Table

    const result = { header, rows }
    res.status(200).json(result)
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
})

router.get('/stats', function(req, res) {
  Promise.all([
    primavera.estatisticas_vendas_total(req.session.primavera.access_token, req.session.user.primavera_id),
    primavera.estatisticas_vendas_cliente(req.session.primavera.access_token, req.session.user.primavera_id),
    primavera.estatisticas_vendas_ultimos_dias(req.session.primavera.access_token, req.session.user.primavera_id),
    primavera.estatisticas_num_docs_ultimos_dias(req.session.primavera.access_token, req.session.user.primavera_id)
  ])
  .then(responses => {
    let total = JSON.parse(responses[0]).DataSet.Table[0] || 0,
        clients = JSON.parse(responses[1]).DataSet.Table,
        lastDays = JSON.parse(responses[2]).DataSet.Table,
        lastDocs = JSON.parse(responses[3]).DataSet.Table

    res.status(200).json({ total, clients, lastDays, lastDocs })
  })
  .catch(error => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })
});

module.exports = router;
