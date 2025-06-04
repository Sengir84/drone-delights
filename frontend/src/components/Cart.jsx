import React, { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import './Cart.css'; 
import { useNavigate } from 'react-router-dom';


const Cart = ({ cart: externalCart,showControls = true, onClose }) => {
  const {
  cart: contextCart,
  handleAddToCart,
  handleRemoveFromCart,
  handleDeleteFromCart,
  totalPrice
} = useContext(CartContext);

const cart = externalCart || contextCart;
  
  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/menu');
    if (onClose) onClose();
  };

  const handleCheckout = () => {
    navigate('/checkout');
    if (onClose) onClose();
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul className="cart-items">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <span>{item.name} – {item.price} kr × {item.quantity || 1}</span>
            {showControls && (
              <div className="cart-buttons">
                <button className="addsub" onClick={() => handleRemoveFromCart(item.id)}>−</button>
                <button className="addsub" onClick={() => handleAddToCart(item)}>+</button>
                <button onClick={() => handleDeleteFromCart(item.id)}>🗑️</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {showControls && (
        <>
        <h3>Total: {totalPrice} kr</h3>
        <div className='checkout-buttons'>
          <button className="checkout-button" onClick={handleContinueShopping}>Continue Shopping</button>
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </div>
        </>
      )}
    </div>
    
  );
  
};

export default Cart;