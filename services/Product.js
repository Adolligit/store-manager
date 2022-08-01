const ServiceErrorHandler = require('../Errors/ServiceErrorHandler');
const Product = require('../models/Product');

async function all() {
  const [products] = await Product.all();

  return products;
}

async function byId(id) {
  /*
    function notFound
  */
  const [product] = await Product.byId(id);

  if (!product[0]) return ServiceErrorHandler('notFound', 'Product not found');

  return product[0];
}

const create = (name) => Product.create(name);

async function update(id, name) {
  /*
    function notFound
  */
  const [product] = await Product.byId(id);

  if (!product[0]) return ServiceErrorHandler('notFound', 'Product not found');

  await Product.update(id, name);
  return { id, name };
}

async function remove(id) {
  const [product] = await Product.byId(id);

  if (!product[0]) return ServiceErrorHandler('notFound', 'Product not found');

  return Product.remove(id);
}

module.exports = {
  all,
  byId,
  create,
  update,
  remove,
};
