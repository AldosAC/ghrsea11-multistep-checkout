const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

app.use(express.static(PUBLIC_DIR));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/order/signup', (req, res) => {
  db.user.findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
});

app.post('/order/signup', (req, res) => {
  db.user.create(req.body)
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
})

module.exports = app;