const Joi = require('joi');
const Sale = require('../services/Sale');

async function createSales(req, res) {
  const schema = Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().min(1),
  });

  req.body.forEach((sale) => {
    const { error } = schema.validate(sale);

    if (error) throw new Error(error.message, { cause: { status: 422 } });
  });

  const response = await Sale.createSalesProduct([...req.body]);

  if (!response.saleId) {
    const { statusCode, message } = response;

    return res.status(statusCode).json({ message });
  }

  return res.status(201).json({ id: response.saleId, itemsSold: req.body });
}

module.exports = { createSales };
