import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext"; 
import axios from "axios";
import CardPayment from "../components/CardPayment";
import SwishPayment from "../components/SwishPayment";


const CheckoutPage = () => {
  const { cart, totalPrice, setCart } = useContext(CartContext);
  const [userData, setUserData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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
      setConfirmed(true);
      setIsSubmitting(false);
      // reset local cart
      setCart([]); 

      try {
        //rester cart in backend
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
        <p>Your food is on it's way. 🚀</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Payment</h1>

      <form onSubmit={handleSubmit}>
        <h2>Delivery</h2>
        <input type="text" defaultValue={userData?.firstName} placeholder="Förnamn" required />
        <input type="text" defaultValue={userData?.lastName} placeholder="Efternamn" required />
        <input type="text" defaultValue={userData?.address?.street} placeholder="Gatuadress" required />
        <input type="text" defaultValue={userData?.address?.city} placeholder="Stad" required />
        <input type="text" defaultValue={userData?.address?.zip} placeholder="Postnummer" required />
        <input type="tel" defaultValue={userData?.phone} placeholder="Telefonnummer" required />

        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <ul key={item.id}>
                {item.name} x {item.quantity} - {item.price} kr
              </ul>
            ))}
          </ul>
        )}
        <p><strong>Total:</strong> {totalPrice} kr</p>

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