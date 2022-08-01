const express = require('express');
const useRescue = require('../utils/useRescue');
const Sale = require('../controllers/Sale');
const verifySaleEntry = require('../middlewares/Sale/verifySaleEntry');
const verifyId = require('../middlewares/Product/verifyId');

const router = express.Router();

const create = [verifySaleEntry, Sale.createSales];
const byId = [verifyId, Sale.getSales];

router.get('/', useRescue(Sale.getSales));
router.get('/:id', useRescue(byId));
router.post('/', useRescue(create));
router.delete('/:id', useRescue(Sale.remove));

module.exports = router;