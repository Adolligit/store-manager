const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../public/swagger.json');
const productRoutes = require('./product.route');
const saleRoutes = require('./sale.route');

routes.use('/products', productRoutes);
routes.use('/sales', saleRoutes);
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = routes;