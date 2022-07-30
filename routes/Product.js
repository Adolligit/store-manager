const express = require('express');
const rescue = require('express-rescue');
const Product = require('../controllers/Product');
const verifyId = require('../middlewares/Products/verifyId');

const router = express.Router();
const middlewares = [verifyId, Product.byId];

router.get('/', Product.all);
router.get('/:id', middlewares.map((mid) => rescue(mid)));

module.exports = router;