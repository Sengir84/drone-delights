function CartSummary({ cart }) {
  return (
    <div className="cart-summary">
      <h2>Your Cart ({cart.length})</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} – {item.price} kr × {item.quantity || 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CartSummary;