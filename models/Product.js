const connection = require('../connection/connect');

const all = () => connection.execute(
  'SELECT * FROM StoreManager.products',
);

const byId = (id) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE id=?',
  [id],
);

function create(name) {
  return connection.execute(
    'INSERT INTO StoreManager.products VALUE(null, ?)',
    [name],
  );
}

const update = (id, name) => connection.execute(
  ` UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`,
  [name, id],
);

const remove = (id) => connection.execute(
  'DELETE FROM StoreManager.products WHERE id = ?',
  [id],
);

const query = (search) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE name LIKE ?',
  [`%${search}%`],
);

module.exports = {
  all,
  byId,
  create,
  update,
  remove,
  query,
};