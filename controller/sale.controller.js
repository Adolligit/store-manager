const Sale = require('../service/sale.service');

async function createSales(req, res) {
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

async function remove({ params }, res) {
  const response = await Sale.remove(params.id);

  if (response.statusCode) {
    const { statusCode, message } = response;

    throw new Error(message, { cause: { status: statusCode } });
  }

  return res.status(204).end();
}

async function update(req, res) {
  const { id } = req.params;

  const updated = await Sale.update(id, [...req.body]);

  if (updated.statusCode) {
    const { statusCode, message } = updated;

    throw new Error(message, { cause: { status: statusCode } });
  }

  return res.status(200).json(updated);
}

module.exports = {
  createSales,
  getSales,
  remove,
  update,
};
