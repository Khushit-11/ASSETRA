import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}


interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  addToWishlist: (item: CartItem) => void;
}


export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.id === item.id);
      if (existing) {
        return prev.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + item.quantity } : ci
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Placeholder for wishlist logic
  const addToWishlist = (item: CartItem) => {
    // Implement wishlist logic here
    alert(`${item.name} added to wishlist!`);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, addToWishlist }}>
      {children}
    </CartContext.Provider>
  );
};