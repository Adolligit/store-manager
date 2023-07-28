const productRouter = require('express').Router();
const Product = require('../controllers/product.controller');
const verifyId = require('../middlewares/Product/verify-id');
const verifyName = require('../middlewares/Product/verify-name');
const useRescue = require('../utils/use-rescue');

const byId = [verifyId, Product.byId];
const create = [verifyName, Product.create];
const update = [verifyId, verifyName, Product.update];

productRouter.get('/', Product.all);
productRouter.post('/', useRescue(create));
productRouter.get('/search', useRescue(Product.query));
productRouter.get('/:id', useRescue(byId));
productRouter.put('/:id', useRescue(update));
productRouter.delete('/:id', useRescue(Product.remove));

module.exports = productRouter;