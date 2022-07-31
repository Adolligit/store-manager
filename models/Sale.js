const connection = require('../connection/connect');

const createSales = () => connection.execute('INSERT INTO StoreManager.sales VALUES ()');

async function createSalesProduct(sale) {
  const { productId, saleId, quantity } = sale;

  await connection.execute(
    'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
}

module.exports = {
  createSales,
  createSalesProduct,
};