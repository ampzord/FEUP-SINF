var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()

const uuid = require('uuid/v4')
const session = require('express-session')

const index = require('./routes/index');
const clients = require('./routes/clients');
const products = require('./routes/products');
const agenda = require('./routes/agenda');
const sales = require('./routes/sales');
const primavera = require('./routes/primavera');

var app = express();

app.use(session({
  genid: () => {
    return uuid()
  },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(logger('common'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/clients', clients);
app.use('/products', products);
app.use('/agenda', agenda);
app.use('/sales', sales);
app.use('/primavera', primavera)

module.exports = app;
