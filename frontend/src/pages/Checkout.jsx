import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext"; 
import axios from "axios";
import CardPayment from "../components/CardPayment";
import SwishPayment from "../components/SwishPayment";
import Cart from "../components/Cart";
import DeliveryInfo from "../components/DeliveryInfo";
import "./Checkout.css";

const CheckoutPage = () => {
  const { cart, totalPrice, setCart } = useContext(CartContext);
  const [userData, setUserData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [cartSnapshot, setCartSnapshot] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Couldn't fetch user", err);
      }
    };

    fetchUserData();
  }, [token]);

  const handlePaymentDetailsChange = (details) => {
    setPaymentDetails(details);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(async () => {
      setCartSnapshot(cart);
      setConfirmed(true);
      setIsSubmitting(false);

      //Update order counts in the database
      try {
      await Promise.all(cart.map(async (item) => {
        const menuItemRes = await axios.get(`http://localhost:3000/menu/${item.id}`);
        const currentOrders = menuItemRes.data.orders || 0;
        const newOrders = currentOrders + (item.quantity || 1);

        await axios.patch(`http://localhost:3000/menu/${item.id}`, {
          orders: newOrders,
        });
      }));
    } catch (err) {
      console.error("Failed to update order counts:", err);
    }
      // reset local cart
      setCart([]); 

      try {
        //reste cart in backend
        await axios.put("http://localhost:3001/api/users/cart", { cart: [] }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Couldn't reset cart", err);
      }
    }, 2000);
  };

  if (confirmed) {
    return (
      <div>
        <h1>Thank you for your order!</h1>
        <div className="confirmation-cart">
        <Cart cart={cartSnapshot} showControls={false} />
        </div>
        <p>Your food is on it's way. </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <DeliveryInfo userData={userData} />

        
        <Cart showControls={false} />

        <h2>Payment</h2>
        <label>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="swish"
            checked={paymentMethod === "swish"}
            onChange={() => setPaymentMethod("swish")}
          />
          Swish
        </label>

        {paymentMethod === "card" && (
          <CardPayment onChange={handlePaymentDetailsChange} />
        )}
        {paymentMethod === "swish" && (
          <SwishPayment onChange={handlePaymentDetailsChange} />
        )}

        <button type="submit" disabled={isSubmitting || cart.length === 0}>
          {isSubmitting ? "Proccessing..." : "Confirm Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;