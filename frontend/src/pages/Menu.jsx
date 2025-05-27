import { useEffect, useState } from "react";
import axios from "axios";
import "./menu.css"; // Assuming you have a CSS file for styling

function MenuPage() {
    const [dishes, setDishes] = useState([]);

      useEffect(() => {
    axios.get("http://localhost:3000/menu")
      .then((res) => setDishes(res.data))
      .catch((err) => console.error("Kunde inte hämta meny", err));
  }, []);

    const foods = dishes.filter(dish => dish.type === "food");
    const drinks = dishes.filter(dish => dish.type === "drink");
    const desserts = dishes.filter(dish => dish.type === "dessert");

    const renderDish = dish => (
        <div key={dish.id} className="menu-item">
            <img src={dish.image} alt={dish.name} className="menu-img" />
            <h2 className="text-lg font-bold mt-2">{dish.name}</h2>
            <p>{dish.description}</p>
            <p className="text-green-600 font-semibold">{dish.price} kr</p>
            <p>Rating: {dish.rating} ⭐</p>

        </div>
    );

  return (
    <div className="menu-container">
      <h1>Menu</h1>
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