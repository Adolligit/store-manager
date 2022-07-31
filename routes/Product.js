const express = require('express');
const Product = require('../controllers/Product');
const verifyId = require('../middlewares/Product/verifyId');
const verifyName = require('../middlewares/Product/verifyName');
const useRescue = require('../utils/useRescue');

const router = express.Router();

const byId = [verifyId, Product.byId];
const create = [verifyName, Product.create];

router.get('/', Product.all);
router.get('/:id', useRescue(byId));
router.post('/', useRescue(create));

module.exports = router;