
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, CartItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper per convertire "€ 10,00" in numero 10.00
const parsePrice = (priceStr: string): number => {
  try {
    // Rimuove simbolo euro, spazi e sostituisce virgola con punto
    const cleanStr = priceStr.replace('€', '').trim().replace(',', '.');
    const val = parseFloat(cleanStr);
    return isNaN(val) ? 0 : val;
  } catch (e) {
    return 0;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.name === item.name);
      if (existingItem) {
        return prevCart.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemName: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.name === itemName);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((i) =>
          i.name === itemName ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prevCart.filter((i) => i.name !== itemName);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (itemName: string) => {
    const item = cart.find((i) => i.name === itemName);
    return item ? item.quantity : 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce((sum, item) => {
    return sum + (parsePrice(item.price) * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getItemQuantity, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
