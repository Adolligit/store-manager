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

  if (response.statusCode) {
    const { statusCode, message } = response;

    throw new Error(message, { cause: { status: statusCode } });
  }

  return res.status(201).json({ id: response.saleId, itemsSold: req.body });
}

async function getSales({ params }, res) {
  const response = await Sale.getSales(params.id);

  if (response.statusCode) {
    const { statusCode, message } = response;

    throw new Error(message, { cause: { status: statusCode } });
  }

  return res.status(200).json(response);
}

module.exports = {
  createSales,
  getSales,
};
