const ServiceErrorHandler = require('../Errors/ServiceErrorHandler');
const Sale = require('../models/Sale');
const Product = require('./Product');

async function createSales() {
  const [{ insertId }] = await Sale.createSales();

  return insertId;
}

async function createSalesProduct(sales) {
  const products = await sales.map(({ productId }) => Product.byId(productId));
  const namesPresent = await Promise.all(products).then((arr) => arr.every((e) => e));

  if (!namesPresent) return ServiceErrorHandler('notFound', 'Product not found');
    
  const saleId = await createSales();
  sales.forEach((sale) => Sale.createSalesProduct({ ...sale, saleId }));

  return { saleId };
}

module.exports = {
  createSales,
  createSalesProduct,
};