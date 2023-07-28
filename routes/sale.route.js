const express = require('express');
const useRescue = require('../utils/use-rescue');
const Sale = require('../controllers/sale.controller');
const verifySaleEntry = require('../middlewares/Sale/verify-sale-entry');
const verifyId = require('../middlewares/Product/verify-id');

const router = express.Router();

const create = [verifySaleEntry, Sale.createSales];
const byId = [verifyId, Sale.getSales];
const remove = [verifyId, Sale.remove];
const update = [verifyId, verifySaleEntry, Sale.update];

router.post('/', useRescue(create));
router.get('/', useRescue(Sale.getSales));
router.get('/:id', useRescue(byId));
router.put('/:id', useRescue(update));
router.delete('/:id', useRescue(remove));

module.exports = router;