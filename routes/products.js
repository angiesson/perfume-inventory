const express = require('express');
const router = express.Router();
const { pool } = require('../index'); // Importera pool från index.js

// GET - Hämta alla produkter
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to get products' });
  }
});

// GET - Hämta en specifik produkt
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// POST - Create new product
router.post('/', async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;
    
    const result = await pool.query(
      'INSERT INTO products (name, quantity, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, quantity, price, category]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT - Uppdatera produkt
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, category } = req.body;
    
    const result = await pool.query(
      'UPDATE products SET name = $1, quantity = $2, price = $3, category = $4 WHERE id = $5 RETURNING *',
      [name, quantity, price, category, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE - Ta bort produkt
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted', product: result.rows[0] });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;