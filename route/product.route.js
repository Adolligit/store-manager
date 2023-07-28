const productRouter = require('express').Router();
const Product = require('../controller/product.controller');
const verifyId = require('../middleware/product/verify-id');
const verifyName = require('../middleware/product/verify-name');
const useRescue = require('../util/use-rescue');

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