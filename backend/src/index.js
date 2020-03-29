const express = require('express');
const routes = require('./routes');

const app = express();

//isso fara com que a aplicacao entenda request body's do formato json
app.use(express.json());

app.use(routes);

app.listen(3333);