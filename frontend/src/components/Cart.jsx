import React, { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import './Cart.css'; 

const Cart = () => {
  const { cart, handleAddToCart, handleRemoveFromCart, handleDeleteFromCart, totalPrice } = useContext(CartContext);
  
  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }
  
  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul className="cart-items">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <span>{item.name} – {item.price} kr × {item.quantity || 1}</span>
            <div className="cart-buttons">
              <button className="addsub" onClick={() => handleRemoveFromCart(item.id)}>−</button>
              <button className="addsub" onClick={() => handleAddToCart(item)}>+</button>
              <button onClick={() => handleDeleteFromCart(item.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: {totalPrice} kr</h3>
    </div>
  );
};

export default Cart;