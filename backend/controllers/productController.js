// backend/controllers/productController.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching products' });
  }
};

exports.createProduct = async (req, res) => {
  const { title, description, price, image, quantity } = req.body;
  try {
    const product = new Product({ title, description, price, image, quantity });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating product' });
  }
};
