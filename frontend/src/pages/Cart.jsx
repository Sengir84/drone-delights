import React from "react";
import Cart from "../components/Cart"; // Adjust path if needed
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart } = useContext(CartContext);
  return (
    <div className="cart-page">
      <Cart cart={cart} />
    </div>
  );
};

export default CartPage;