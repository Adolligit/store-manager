const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger.json');

const ControllerErrorHandler = require('./errors/controller-error-handler');
const Product = require('./routes/product.route');
const Sale = require('./routes/sale.route');

const app = express();
const endpoints = ['/products', '/sales'];

app.get('/', (_request, response) => {
  response.send();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(endpoints[0], Product);
app.use(endpoints[1], Sale);
app.use(ControllerErrorHandler);

module.exports = app;