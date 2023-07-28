const ServiceErrorHandler = require('../middleware/handlerError/service-error-handler');
const Sale = require('../model/sale.model');
const Product = require('./product.service');

async function createSales() {
  const [{ insertId }] = await Sale.createSales();

  return insertId;
}

async function createSalesProduct(sales) {
  const products = await sales.map(({ productId }) => Product.byId(productId));
  const namesPresent = await Promise.all(products).then((arr) => arr.every((e) => e.name));

  /*
    function notFound
  */
  if (!namesPresent) return ServiceErrorHandler('notFound', 'Product not found');
    
  const saleId = await createSales();
  sales.forEach((sale) => Sale.createSalesProduct({ ...sale, saleId }));

  return { saleId };
}

async function getSales(id) {
  const [result] = await ((id) ? Sale.byId(id) : Sale.all());

  if (!result.length && id) return ServiceErrorHandler('notFound', 'Sale not found');

  return result;
}

async function remove(id) {
  const [result] = await Sale.byId(id);

  if (!result.length) return ServiceErrorHandler('notFound', 'Sale not found');

  return Sale.remove(id);
}

async function update(id, data) {
  /*
    function notFound
  */
  const [product] = await Sale.byId(id);

  if (!product.length) return ServiceErrorHandler('notFound', 'Sale not found');

    /*
    function verifyExistProduct
  */
  const products = await data.map(({ productId }) => Product.byId(productId));
  const namesPresent = await Promise.all(products).then((arr) => arr.every((e) => e.name));

  if (!namesPresent) return ServiceErrorHandler('notFound', 'Product not found');

  await data.forEach((e) => Sale.update(id, e));

  return { saleId: id, itemsUpdated: data };
}

module.exports = {
  createSales,
  createSalesProduct,
  getSales,
  remove,
  update,
};