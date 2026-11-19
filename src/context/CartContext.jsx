import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'subakes_cart_items';
const ORDERS_STORAGE_KEY = 'subakes_demo_orders';

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage safely
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Unable to read cart from localStorage:', e);
      return [];
    }
  });

  // Load demo orders submitted by user from localStorage safely
  const [demoOrders, setDemoOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Unable to read demo orders from localStorage:', e);
      return [];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Unable to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // Sync demo orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(demoOrders));
    } catch (e) {
      console.warn('Unable to save demo orders to localStorage:', e);
    }
  }, [demoOrders]);

  const addToCart = (item, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const saveOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `SUB-DEMO-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      time: 'Just now',
      isDemoPlaced: true,
      dataLabel: 'Demo order (placed in this session)'
    };

    setDemoOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = 40; // Default ₹40 for delivery

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItemsCount,
      subtotal,
      tax,
      deliveryFee,
      demoOrders,
      saveOrder
    }}>
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
