const Product = require('../models/Product');

async function all() {
  const [products] = await Product.all();

  return products;
}

async function byId(id) {
  const [product] = await Product.byId(id);

  return product[0];
}

async function create(name) {
  if (name.length < 5) {
    return {
      error: {
        code: invalid_length,
        message: '"name" length'
      },
    };
  }

  await Product.create(name);
}

module.exports = {
  all,
  byId,
  create,
};
