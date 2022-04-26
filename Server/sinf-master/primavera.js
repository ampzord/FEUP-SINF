const request = require('request-promise')
const _ = require('lodash')
const moment = require('moment')

function rawQuery(bearer, query) {
  const URL = process.env.API_URL + '/Administrador/Consulta'
  return request.post({
    url: URL,
    body: JSON.stringify(query),
    headers: { 
      'Authorization': 'Bearer ' + bearer,
      'Content-Type': 'application/json'
    }
  })
}

function token() {
  const URL = process.env.API_URL + '/token'
  const REQ_DATA = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    company: process.env.COMPANY,
    instance: process.env.INSTANCE,
    grant_type: process.env.GRANT_TYPE,
    line: process.env.LINE
  }

  const data = Object.keys(REQ_DATA).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(REQ_DATA[key])
  }).join('&')

  return request.post({
    url: URL,
    body: data,
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

function clientes(bearer, primavera_id) {
  const query = `
    SELECT 
      Cliente, Nome, Fac_Mor, Pais 
    FROM Clientes 
    WHERE Vendedor = '${primavera_id}'
  `
  
  return rawQuery(bearer, query)
}

function cliente(bearer, id) {
  const URL = process.env.API_URL + '/Base/Clientes/Edita/' + id
  return request.get({
    url: URL,
    headers: { 
      'Authorization': 'Bearer ' + bearer
    }
  })
}

function cliente_oportunidades(bearer, id) {
  const query = `
    SELECT
      IdOportunidade,
      NumProposta,
      Entidade,
      Oportunidade
    FROM PropostasOPV
    JOIN CabecOportunidadesVenda ON PropostasOPV.IdOportunidade = CabecOportunidadesVenda.ID
    WHERE Entidade = '${id}'
  `

  return rawQuery(bearer, query)
}

function cria_cliente(bearer, cliente) {
  const URL = process.env.API_URL + '/Base/Clientes/Actualiza'
  return request.post({
    url: URL,
    body: JSON.stringify({
      ...cliente
    }),
    headers: { 
      'Authorization': 'Bearer ' + bearer,
      'Content-Type': 'application/json'
    }
  })
}

function produtos(bearer) {
  const URL = process.env.API_URL + '/Base/Artigos/LstArtigos'
  return request.get({
    url: URL,
    headers: { 
      'Authorization': 'Bearer ' + bearer
    }
  })
}

function produto(bearer, id) {
  const URL = process.env.API_URL + '/Base/Artigos/Edita/' + id
  return request.get({
    url: URL,
    headers: { 
      'Authorization': 'Bearer ' + bearer
    }
  })
}

function produto_vendas(bearer, primavera_id, id) {
  const query = `
    SELECT t1.Mes, t1.Total, ISNULL(t2.TotalVendedor, 0) as TotalVendedor FROM (
      SELECT
        MONTH(cd.Data) as Mes,
        SUM(ld.PrecoLiquido) as Total
      FROM CabecDoc cd
      JOIN LinhasDoc ld ON cd.Id = ld.IdCabecDoc
      WHERE ld.Artigo = '${id}' and
            (cd.TipoDoc = 'FA' or cd.TipoDoc = 'NC') and 
          cd.Data > Dateadd(Month, Datediff(Month, 0, DATEADD(m, -6, current_timestamp)), 0)
      GROUP BY MONTH(cd.Data)
    ) t1 LEFT JOIN (
      SELECT
        MONTH(cd.Data) as Mes,
        SUM(ld.PrecoLiquido) as TotalVendedor
      FROM CabecDoc cd
      JOIN LinhasDoc ld ON cd.Id = ld.IdCabecDoc
      JOIN Clientes c ON c.Cliente = cd.Entidade
      WHERE ld.Artigo = '${id}' and 
          c.Vendedor = '${primavera_id}' and 
          (cd.TipoDoc = 'FA' or cd.TipoDoc = 'NC') and
          cd.Data > Dateadd(Month, Datediff(Month, 0, DATEADD(m, -6, current_timestamp)), 0)
      GROUP BY MONTH(cd.Data)
    ) t2 ON t1.Mes = t2.Mes
  `

  return rawQuery(bearer, query)
}

function produto_stocks(bearer, id) {
  const query = `
    SELECT
      ISNULL(SUM(StkActual), 0) AS StkActual 
    FROM V_INV_ArtigoArmazem WHERE Artigo = '${id}'
  `

  return rawQuery(bearer, query)
}

function orcamentos(bearer, primavera_id) {
  return _getDocumentos(bearer, primavera_id, 'ORC')
}

function encomendas(bearer, primavera_id) {
  return _getDocumentos(bearer, primavera_id, 'ECL')
}

function faturas(bearer, primavera_id) {
  return _getDocumentos(bearer, primavera_id, 'FA')
}

function orcamentos_cliente(bearer, primavera_id, client_id) {
  return _getDocumentosCliente(bearer, primavera_id, 'ORC', client_id)
}

function encomendas_cliente(bearer, primavera_id, client_id) {
  return _getDocumentosCliente(bearer, primavera_id, 'ECL', client_id)
}

function faturas_cliente(bearer, primavera_id, client_id) {
  return _getDocumentosCliente(bearer, primavera_id, 'FA', client_id)
}

function documento(bearer, id) {
  return _getDocumento(bearer, id)
}

function cria_orcamento(bearer, orcamento) {
  return _criaDocumento(bearer, 'ORC', orcamento.client_id, orcamento.rows)
}

function cria_encomenda(bearer, orcamento) {
  return _criaDocumento(bearer, 'ECL', orcamento.client_id, orcamento.rows)
}

function cria_fatura(bearer, orcamento) {
  return _criaDocumento(bearer, 'FA', orcamento.client_id, orcamento.rows)
}

function transforma_orcamento(bearer, document_number, client_id) {
  return _transformaDocumento(bearer, 'ORC', 'ECL', document_number, client_id)
}

function transforma_encomenda(bearer, document_number, client_id) {
  return _transformaDocumento(bearer, 'ECL', 'FA', document_number, client_id)
}


function estatisticas_vendas_total(bearer, primavera_id) {
  const query = `
    SELECT
      ISNULL(SUM(ld.PrecoLiquido), 0) as Total
    FROM CabecDoc cd
    JOIN LinhasDoc ld ON cd.Id = ld.IdCabecDoc
    JOIN Clientes c ON c.Cliente = cd.Entidade
    WHERE c.Vendedor = '${primavera_id}' and
          (cd.TipoDoc = 'FA' or cd.TipoDoc = 'NC') and 
        MONTH(cd.Data) = MONTH(current_timestamp)
    GROUP BY MONTH(cd.Data)
  `

  return rawQuery(bearer, query)
}

function estatisticas_vendas_ultimos_dias(bearer, primavera_id) {
  const query = `
    SELECT
      DAY(cd.Data) as Dia,
      SUM(ld.PrecoLiquido) as Total
    FROM CabecDoc cd
    JOIN LinhasDoc ld ON cd.Id = ld.IdCabecDoc
    JOIN Clientes c ON c.Cliente = cd.Entidade
    WHERE
      c.Vendedor = '${primavera_id}' and 
      (cd.TipoDoc = 'FA' or cd.TipoDoc = 'NC') and
      cd.Data > current_timestamp and
      cd.Data < Dateadd(d, Datediff(d, 0, DATEADD(d, 7, current_timestamp)), 0)
    GROUP BY DAY(cd.Data)
  `

  return rawQuery(bearer, query)
}

function estatisticas_num_docs_ultimos_dias(bearer, primavera_id) {
  const query = `
    SELECT t1.Dia, t1.ContagemEnc, ISNULL(t2.ContagemOrc, 0) as ContagemOrc FROM (
      SELECT
        DAY(cd.Data) as Dia,
        COUNT(cd.Id) as ContagemEnc
      FROM CabecDoc cd
      JOIN Clientes c ON c.Cliente = cd.Entidade
      WHERE
        c.Vendedor = '${primavera_id}' and 
        cd.TipoDoc = 'ECL' and
        cd.Data > current_timestamp and
        cd.Data < Dateadd(d, Datediff(d, 0, DATEADD(d, 7, current_timestamp)), 0)
      GROUP BY DAY(cd.Data)
    ) t1 LEFT JOIN (
      SELECT
        DAY(cd.Data) as Dia,
        COUNT(cd.Id) as ContagemOrc
      FROM CabecDoc cd
      JOIN Clientes c ON c.Cliente = cd.Entidade
      WHERE
        c.Vendedor = '${primavera_id}' and 
        cd.TipoDoc = 'ORC' and
        cd.Data > current_timestamp and
        cd.Data < Dateadd(d, Datediff(d, 0, DATEADD(d, 7, current_timestamp)), 0)
      GROUP BY DAY(cd.Data)
    ) t2 ON t1.Dia = t2.Dia
  `

  return rawQuery(bearer, query)
}

function estatisticas_vendas_cliente(bearer, primavera_id) {
  const query = `
    SELECT
      c.Cliente,
      c.Nome,
      SUM(ld.PrecoLiquido) as Total
    FROM CabecDoc cd
    JOIN LinhasDoc ld ON cd.Id = ld.IdCabecDoc
    JOIN Clientes c ON c.Cliente = cd.Entidade
    WHERE c.Vendedor = '${primavera_id}' and 
        (cd.TipoDoc = 'FA' or cd.TipoDoc = 'NC')
    GROUP BY c.Cliente, c.Nome
  `

  return rawQuery(bearer, query)
}

function existe_oportunidade(bearer, id) {
  const URL = process.env.API_URL + '/CRM/OportunidadesVenda/Existe/OPV' + id
  return request.get({
    url: URL,
    headers: { 
      'Authorization': 'Bearer ' + bearer
    }
  })
}

function oportunidade(bearer, id) {
  const URL = process.env.API_URL + '/CRM/OportunidadesVenda/Edita/OPV' + id
  return request.get({
    url: URL,
    headers: { 
      'Authorization': 'Bearer ' + bearer
    }
  })
}

function cria_oportunidade(bearer, primavera_id, client_id) {
  const URL = process.env.API_URL + `/CRM/OportunidadesVenda/Actualiza/""`
  return request.post({
    url: URL,
    body: JSON.stringify({
      Oportunidade: 'OPV' + client_id,
      Descricao: 'Oportunidade de venda para o cliente ' + client_id,
      DataCriacao: moment().format('MM/DD/YYYY'),
      DataExpiracao: moment().add(1, 'M').format('MM/DD/YYYY'),
      Resumo: 'OPV' + client_id,
      Entidade: client_id,
      TipoEntidade: 'C',
      EstadoVenda: '0',
      Moeda: 'EUR',
      Vendedor: primavera_id,
      CicloVenda: 'CV01',
      Zona: '01'
    }),
    headers: { 
      'Authorization': 'Bearer ' + bearer,
      'Content-Type': 'application/json'
    }
  })
}

function cria_oportunidade_orcamento(bearer, opp_id, num_prop, rows) {
  const URL = process.env.API_URL + `/CRM/PropostasOPV/Actualiza/`
  const primaveraRows = rows.map((row, index) => {
    return { Artigo: row.product_id, Quantidade: row.qtt, IdOportunidade: opp_id, NumProposta: num_prop, Linha: index}
  })

  return request.post({
    url: URL,
    body: JSON.stringify({
      Linhas: primaveraRows,
      IdOportunidade: opp_id,
      NumProposta: num_prop
    }),
    headers: { 
      'Authorization': 'Bearer ' + bearer,
      'Content-Type': 'application/json'
    }
  })
}

function _getDocumentos(bearer, primavera_id, type) {
  const query = `
    SELECT 
      Id, *
    FROM CabecDoc JOIN Clientes ON CabecDoc.Entidade = Clientes.Cliente
    WHERE Clientes.Vendedor = '${primavera_id}' AND CabecDoc.TipoDoc = '${type}'
  `

  return rawQuery(bearer, query)
}

function _getDocumentosCliente(bearer, primavera_id, type, client_id) {
  const query = `
    SELECT 
      *
    FROM CabecDoc JOIN Clientes ON CabecDoc.Entidade = Clientes.Cliente
    WHERE Clientes.Vendedor = '${primavera_id}' AND CabecDoc.TipoDoc = '${type}' AND Clientes.Cliente = '${client_id}'
  `

  return rawQuery(bearer, query)
}

function _getDocumento(bearer, id) {
  return Promise.all([_getDocumentoCabec(bearer, id), _getDocumentoLinhas(bearer, id)])
}

function _getDocumentoCabec(bearer, id) {
  const query = `
    SELECT 
      *
    FROM CabecDoc JOIN Clientes ON CabecDoc.Entidade = Clientes.Cliente
    WHERE CabecDoc.Id = '${id}'
  `

  return rawQuery(bearer, query)
}

function _getDocumentoLinhas(bearer, id) {
  const query = `
    SELECT 
      *
    FROM LinhasDoc
    WHERE LinhasDoc.IdCabecDoc = '${id}'
  `

  return rawQuery(bearer, query)
}

function _criaDocumento(bearer, document_type, client_id, rows) {
  const URL = process.env.API_URL + '/Vendas/Docs/CreateDocument/'
  const primaveraRows = _.map(rows, row => {
    return { Artigo: row.product_id, Quantidade: row.qtt }
  })

  return request.post({
    url: URL,
    body: JSON.stringify({
      Linhas: primaveraRows,
      Tipodoc: document_type,
      Serie: 'A',
      Entidade: client_id,
      TipoEntidade: 'C',
      DataDoc: moment().format('DD-MM-YYYY')
    }),
    headers: { 
      'Authorization': 'Bearer ' + bearer,
      'Content-Type': 'application/json'
    }
  })
}

function _transformaDocumento(bearer, document_type_original, document_type, document_number, client_id) {
  const URL = process.env.API_URL + `/Vendas/Docs/TransformDocument/${document_type_original}/A/${document_number}/000/true`
  return request.post({
    url: URL,
    body: JSON.stringify({
      Tipodoc: document_type,
      Serie: 'A',
      Entidade: client_id,
      TipoEntidade: 'C',
      DataDoc: moment().format('DD-MM-YYYY'),
      DataVenc: moment().add(1, 'M').format('DD-MM-YYYY')
    }),
    headers: { 
      'Authorization': 'Bearer ' + bearer,
      'Content-Type': 'application/json'
    }
  })
}


module.exports = {
  query: rawQuery,
  token,
  clientes,
  cliente,
  cliente_oportunidades,
  cria_cliente,
  produtos,
  produto,
  produto_vendas,
  produto_stocks,
  orcamentos,
  encomendas,
  faturas,
  orcamentos_cliente,
  encomendas_cliente,
  faturas_cliente,
  documento,
  cria_orcamento,
  cria_encomenda,
  cria_fatura,
  estatisticas_vendas_total,
  estatisticas_vendas_ultimos_dias,
  estatisticas_num_docs_ultimos_dias,
  estatisticas_vendas_cliente,
  transforma_orcamento,
  transforma_encomenda,
  existe_oportunidade,
  oportunidade,
  cria_oportunidade,
  cria_oportunidade_orcamento
}