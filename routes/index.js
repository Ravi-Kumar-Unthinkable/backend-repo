const express = require('express');
const auth = require('./auth/index');
const app  = express();

app.use('/auth', auth);

module.exports = app;

