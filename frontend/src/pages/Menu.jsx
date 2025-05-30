import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "./menu.css"; 

function MenuPage() {
    const [dishes, setDishes] = useState([]);
    const { cart, setCart, favorites, setFavorites } = useContext(CartContext);

      useEffect(() => {
    axios.get("http://localhost:3000/menu")
      .then((res) => setDishes(res.data))
      .catch((err) => console.error("Kunde inte hämta meny", err));
  }, []);
  
  
  
const handleAddToCart = (dish) => {
  setCart(prevCart => {
    const existing = prevCart.find(item => item.id === dish.id);
    if (existing) {
      // Increase quantity if item already in cart
      return prevCart.map(item =>
        item.id === dish.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    }
    
    return [...prevCart, { ...dish, quantity: 1 }];
  });
};

const handleAddToFavorites = (dish) => {
  setFavorites(prevFavorites => {
    // Check if dish is already in favorites
    const isFavorite = prevFavorites.some(item => item.id === dish.id);
    if (isFavorite) {
      // Remove it if already favorite
      return prevFavorites.filter(item => item.id !== dish.id);
    } else {
      // Otherwise, add it
      return [...prevFavorites, dish];
    }
  });
};

    //Sorts after category
    const foods = dishes.filter(dish => dish.type === "food");
    const drinks = dishes.filter(dish => dish.type === "drink");
    const desserts = dishes.filter(dish => dish.type === "dessert");

    //Shows food card
    const renderDish = (dish) => {
  const isFavorite = favorites.some(item => item.id === dish.id);

  return (
    <div key={dish.id} className="menu-item">
      <img src={dish.image} alt={dish.name} className="menu-img" />
      <h2 className="text-lg font-bold mt-2">{dish.name}</h2>
      <p>{dish.description}</p>
      <p className="text-green-600 font-semibold">{dish.price} kr</p>
      <p>Rating: {dish.rating} ⭐</p>

      <button onClick={() => handleAddToCart(dish)}>🛒 Add to cart</button>

      <button onClick={() => handleAddToFavorites(dish)}>
        {isFavorite ? "💖 Remove favorite" : "🤍 Add to favorites"}
      </button>
    </div>
  );
};



  return (
    <div className="menu-container">
      <h1>Menu</h1>
      {/* TEST */}
      <div>
  <h2>Your Cart ({cart.length})</h2>
  <ul>
  {cart.map(item => (
    <li key={item.id}>
      {item.name} – {item.price} kr × {item.quantity || 1}
    </li>
  ))}
</ul>

  <h2>Your Favorites ({favorites.length})</h2>
  <ul>
    {favorites.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
</div>
       <section>
        <h2 className="category">Food</h2>
          <div className="food-grid">
            {foods.map(renderDish)}
          </div>
       </section>

       <section>
        <h2 className="category">Drinks</h2>
          <div className="drinks-grid">
            {drinks.map(renderDish)}
          </div>
       </section>

       <section>
        <h2 className="category">Desserts</h2>
          <div className="dessert-grid">
            {desserts.map(renderDish)}
          </div>
       </section>
    </div>
  );
};
export default MenuPage;