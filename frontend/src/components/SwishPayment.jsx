import { useState } from "react";

const SwishPaymentForm = ({ onChange }) => {
  const [phone, setPhone] = useState("");

  const handleChange = () => {
    onChange({ phone });
  };

  return (
    <div>
      <label>
        Swish-telefonnummer
        <input
          type="tel"
          value={phone}
          onChange={e => {
            setPhone(e.target.value);
            handleChange();
          }}
          placeholder="0701234567"
          required
        />
      </label>
    </div>
  );
};

export default SwishPaymentForm;