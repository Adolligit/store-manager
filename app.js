const express = require('express');
const ErroHandler = require('./middlewares/ErroHandler');
const Product = require('./routes/Product');

const app = express();
const endpoints = ['/products'];

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(endpoints[0], Product);
app.use(ErroHandler);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;