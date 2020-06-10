const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

//controle de acesso(seguranca da api)
app.use(cors());
//isso fara com que a aplicacao entenda request body's do formato json
app.use(express.json());

app.use(routes);

app.use(errors());

module.exports = app;