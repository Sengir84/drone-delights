import { useState } from "react";

const CardPaymentForm = ({ onChange }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleChange = () => {
    onChange({ cardNumber, expiry, cvv });
  };

  return (
    <div>
      <label>
        Cardnumber
        <input
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
      </label>

      <label>
        Expires (MM/YY)
        <input
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
      </label>

      <label>
        CVV
        <input
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
      </label>
    </div>
  );
};

export default CardPaymentForm;