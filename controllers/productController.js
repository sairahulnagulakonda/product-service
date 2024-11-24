const productModel = require('../models/productModel');

module.exports = {
  getAllProducts: (req, res) => {
    productModel.getAllProducts((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  getProductById: (req, res) => {
    const { id } = req.params;
    productModel.getProductById(id, (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ message: 'Product not found' });
      res.json(row);
    });
  },

  createProduct: (req, res) => {
    productModel.createProduct(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.lastID, ...req.body });
    });
  },

  updateProduct: (req, res) => {
    const { id } = req.params;
    productModel.updateProduct(id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.changes === 0) return res.status(404).json({ message: 'Product not found' });
      res.json({ id, ...req.body });
    });
  },

  deleteProduct: (req, res) => {
    const { id } = req.params;
    productModel.deleteProduct(id, (err, result) => {
      if (err) {
        if (err.message === 'Product not found') {
          return res.status(404).json({ error: err.message });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Product deleted successfully', result });
    });

  },
};
