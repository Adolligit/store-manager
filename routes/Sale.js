const express = require('express');
const useRescue = require('../utils/useRescue');
const Sale = require('../controllers/Sale');
const verifySaleEntry = require('../middlewares/Sale/verifySaleEntry');

const router = express.Router();

const create = [verifySaleEntry, Sale.createSales];

router.post('/', useRescue(create));

module.exports = router;