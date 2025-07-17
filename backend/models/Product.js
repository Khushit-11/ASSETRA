// backend/models/Product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  quantity: Number
});

const Product = mongoose.model('Product', productSchema);

export default Product;
