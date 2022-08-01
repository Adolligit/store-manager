const connection = require('../connection/connect');

const createSales = () => connection.execute('INSERT INTO StoreManager.sales VALUES ()');

async function createSalesProduct(sale) {
  const { productId, saleId, quantity } = sale;

  await connection.execute(
    'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
}

const all = () =>
  connection.execute(
    `
      SELECT 
        sale_id as saleId, 
        s.date, 
        product_id as productId, 
        quantity
      FROM StoreManager.sales_products sp
      LEFT JOIN StoreManager.products p ON sp.product_id = p.id
      RIGHT JOIN StoreManager.sales s ON sp.sale_id = s.id
      ORDER BY saleId, productId;
    `,
  );

const byId = (id) =>
  connection.execute(
    `
      SELECT date, product_id as productId, quantity
      FROM StoreManager.sales_products sp
      RIGHT JOIN StoreManager.sales s
      ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY productId;
    `,
    [id],
  );

const remove = (id) =>
  connection.execute(
    `
      DELETE FROM StoreManager.sales
      WHERE id = ?
    `,
    [id],
  );

module.exports = {
  createSales,
  createSalesProduct,
  all,
  byId,
  remove,
};