import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Example GET route
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Example POST route
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// Add this line at the end for a default export:
export default router;

