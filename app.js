const express = require('express');
const ControllerErrorHandler = require('./Errors/ControllerErrorHandler');
const Product = require('./routes/Product');
const Sale = require('./routes/Sale');

const app = express();
const endpoints = ['/products', '/sales'];

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(endpoints[0], Product);
app.use(endpoints[1], Sale);
app.use(ControllerErrorHandler);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;