const connection = require('../connection/connect');

const all = () => connection.execute('SELECT * FROM StoreManager.products');
const byId = (id) => connection.execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
const create = (name) => connection.execute('INSERT INTO StoreManager.products VALUE(null, ?)', [name]);

module.exports = {
  all,
  byId,
  create,
};