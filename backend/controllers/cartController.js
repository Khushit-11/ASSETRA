// backend/controllers/cartController.js

import Cart from '../models/Cart.js';

// Add product to user's cart
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    // Find cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart if none exists
      cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
    } else {
      // Find if product already exists in cart
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        // Increment quantity if exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product item to cart
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: 'Error adding to cart', error: err.message });
  }
};

// Get the current user's cart with populated product details
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching cart', error: err.message });
  }
};
