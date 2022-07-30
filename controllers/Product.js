const Product = require('../services/Product');

const all = async (_req, res) => res.status(200).json(await Product.all());

async function byId(_req, res) {
  const product = await Product.byId(res.locals.id);

  if (!product) {
    throw new Error(
      'Product not found',
      { cause: { status: 404 } },
    );
  }

  return res.status(200).json(product);
}

module.exports = {
  all,
  byId,
};