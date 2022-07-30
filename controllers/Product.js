const Joi = require('joi');
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

async function create(req, res) {
  const schema = Joi.object({ name: Joi.string().min(5) });
  const { error } = schema.validate(req.body);
  
  if (error) throw new Error(error.message, { cause: { status: 422 } });
  
  const { name } = req.body;
  await Product.create(name);
  
  const products = await Product.all();
  return res.status(201).json({ id: products.length, name });
}

module.exports = {
  all,
  byId,
  create,
};