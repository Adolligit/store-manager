const connection = require('../connection/connect');

const all = () => connection.execute('SELECT * FROM StoreManager.products');
const byId = (id) => connection.execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);

module.exports = {
  all,
  byId,
};