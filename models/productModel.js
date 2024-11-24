const pool = require('../config/database');

module.exports = {
  getAllProducts: async (callback) => {
    try {
      const result = await pool.query('SELECT * FROM products');
      callback(null, result.rows);
    } catch (err) {
      callback(err);
    }
  },

  getProductById: async (id, callback) => {
    try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      callback(null, result.rows[0]);
    } catch (err) {
      callback(err);
    }
  },

  createProduct: async (product, callback) => {
    const { name, description, price, availability } = product;
    try {
      const result = await pool.query(
        'INSERT INTO products (name, description, price, availability) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, availability]
      );
      callback(null, result.rows[0]);
    } catch (err) {
      callback(err);
    }
  },

  updateProduct: async (id, product, callback) => {
    const { name, description, price, availability } = product;
    try {
      const result = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3, availability = $4 WHERE id = $5 RETURNING *',
        [name, description, price, availability, id]
      );
      callback(null, result.rows[0]);
    } catch (err) {
      callback(err);
    }
  },

  deleteProduct: async (id, callback) => {
    try {
      const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        callback(new Error('Product not found'));
      } else {
        callback(null, result.rows[0]);
      }
    } catch (err) {
      callback(err);
    }
  },
};
