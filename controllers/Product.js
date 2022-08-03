const Product = require('../services/Product');

const all = async (_req, res) => res.status(200).json(await Product.all());

async function byId(_req, res) {
  const product = await Product.byId(res.locals.id);

  if (product.statusCode) {
    const { message, statusCode } = product;

    throw new Error(message, { cause: { status: statusCode } });
  }

  return res.status(200).json(product);
}

async function create(req, res) {
  const { name } = req.body;
  await Product.create(name);
  
  const products = await Product.all();
  return res.status(201).json({ id: products.length, name });
}

async function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const updated = await Product.update(id, name);

  if (updated.statusCode) {
    const { statusCode, message } = updated;

    throw new Error(message, { cause: { status: statusCode } });
  }

  return res.status(200).json(updated);
}

async function remove(req, res) {
  const { id } = req.params;
  const removed = await Product.remove(id);

  if (removed.statusCode) {
    const { statusCode, message } = removed;

    throw new Error(message, { cause: { status: statusCode } });
  }

  res.status(204).end();
}

async function query(req, res) {
  const { q } = req.query;

  if (!q) return all(req, res);

  return res.status(200).json(await Product.query(q));
}

module.exports = {
  all,
  byId,
  create,
  update,
  remove,
  query,
};