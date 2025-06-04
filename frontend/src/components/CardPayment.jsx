import { useState } from "react";
import "./CardPayment.css"; 

const CardPaymentForm = ({ onChange }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleChange = () => {
    onChange({ cardNumber, expiry, cvv });
  };

  return (
     <div className="card-fields">
    <div className="form-group">
      <label htmlFor="cardNumber">Cardnumber</label>
      <input
        id="cardNumber"
        type="text"
        value={cardNumber}
        maxLength={16}
        onChange={e => {
          setCardNumber(e.target.value);
          handleChange();
        }}
        placeholder="1234 5678 9012 3456"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="expiry">Expires (MM/YY)</label>
      <input
        id="expiry"
        type="text"
        value={expiry}
        maxLength={5}
        onChange={e => {
          setExpiry(e.target.value);
          handleChange();
        }}
        placeholder="12/25"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="cvv">CVV</label>
      <input
        id="cvv"
        type="password"
        value={cvv}
        maxLength={3}
        onChange={e => {
          setCvv(e.target.value);
          handleChange();
        }}
        placeholder="123"
        required
      />
    </div>
  </div>
);
};

export default CardPaymentForm;