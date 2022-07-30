const Product = require('../models/Product');

async function all() {
  const [products] = await Product.all();

  return products;
}

async function byId(id) {
  const [product] = await Product.byId(id);

  return product[0];
}

module.exports = {
  all,
  byId,
};
