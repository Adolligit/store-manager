const express = require('express');
const rescue = require('express-rescue');
const Product = require('../controllers/Product');
const verifyId = require('../middlewares/Products/verifyId');
const verifyName = require('../middlewares/Products/verifyName');

const router = express.Router();
const useRescue = (arr) => arr.map((e) => rescue(e));

const byId = [verifyId, Product.byId];
const create = [verifyName, Product.create];

router.get('/', Product.all);
router.get('/:id', useRescue(byId));
router.post('/', useRescue(create));

module.exports = router;