const connection = require('../connection/connect');

const all = () => connection.execute('SELECT * FROM StoreManager.products');
const byId = (id) => connection.execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);

function create(name) {
  return connection.execute(
    'INSERT INTO StoreManager.products VALUE(null, ?)',
    [name],
  );
}

async function update(id, name) {
  const query = `
    UPDATE StoreManager.products 
    SET name = ?
    WHERE id = ?;
  `;

  return connection.execute(query, [name, id]);
}

module.exports = {
  all,
  byId,
  create,
  update,
};