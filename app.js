const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const ControllerErrorHandler = require('./errors/ControllerErrorHandler');
const Product = require('./routes/Product');
const Sale = require('./routes/Sale');

const app = express();
const endpoints = ['/products', '/sales'];

app.get('/', (_request, response) => {
  response.send();
});

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(endpoints[0], Product);
app.use(endpoints[1], Sale);
app.use(ControllerErrorHandler);

module.exports = app;