const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

app.use(express.static(PUBLIC_DIR));
app.use(morgan('dev'));
app.use(bodyParser.json());

module.exports = app;