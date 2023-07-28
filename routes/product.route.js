const express = require('express');
const Product = require('../controllers/product.controller');
const verifyId = require('../middlewares/Product/verify-id');
const verifyName = require('../middlewares/Product/verify-name');
const useRescue = require('../utils/use-rescue');

const router = express.Router();

const byId = [verifyId, Product.byId];
const create = [verifyName, Product.create];
const update = [verifyId, verifyName, Product.update];

router.get('/', Product.all);
router.post('/', useRescue(create));
router.get('/:id', useRescue(byId));
router.put('/:id', useRescue(update));
router.delete('/:id', useRescue(Product.remove));
router.get('/search', useRescue(Product.query));

module.exports = router;