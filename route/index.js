const routes = require('express').Router();
const productRoutes = require('./product.route');
const saleRoutes = require('./sale.route');

routes.use('/products', productRoutes);
routes.use('/sales', saleRoutes);

module.exports = routes;