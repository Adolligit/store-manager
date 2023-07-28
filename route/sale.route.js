const saleRouter = require('express').Router();
const useRescue = require('../util/use-rescue');
const Sale = require('../controller/sale.controller');
const verifySaleEntry = require('../middleware/sale/verify-sale-entry');
const verifyId = require('../middleware/product/verify-id');

const create = [verifySaleEntry, Sale.createSales];
const byId = [verifyId, Sale.getSales];
const remove = [verifyId, Sale.remove];
const update = [verifyId, verifySaleEntry, Sale.update];

saleRouter.post('/', useRescue(create));
saleRouter.get('/', useRescue(Sale.getSales));
saleRouter.get('/:id', useRescue(byId));
saleRouter.put('/:id', useRescue(update));
saleRouter.delete('/:id', useRescue(remove));

module.exports = saleRouter;