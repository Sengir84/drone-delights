import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "./menu.css"; 
import CategorySection from "../components/CategorySection";

function MenuPage() {
    const [dishes, setDishes] = useState([]);
    const { cart, favorites, handleAddToCart, handleAddToFavorites } = useContext(CartContext);

      useEffect(() => {
    axios.get("http://localhost:3000/menu")
      .then((res) => setDishes(res.data))
      .catch((err) => console.error("Couldn't fetch menu", err));
  }, []);

    //Sorts after category
    const foods = dishes.filter(dish => dish.type === "food");
    const drinks = dishes.filter(dish => dish.type === "drink");
    const desserts = dishes.filter(dish => dish.type === "dessert");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const handlers = { favorites, handleAddToCart, handleAddToFavorites };

  return (

<div className="menu-container">



<h1>Menu</h1>

<div className="category-buttons-section">
  <button className="category-button" onClick={() => setSelectedCategory("all")}>All</button>
  <button className="category-button" onClick={() => setSelectedCategory("food")}>Foods</button>
  <button className="category-button" onClick={() => setSelectedCategory("drink")}>Drinks</button>
  <button className="category-button" onClick={() => setSelectedCategory("dessert")}>Desserts</button>
  <button className="category-button" onClick={() => setSelectedCategory("favorites")}>Favorites</button>
</div>

{selectedCategory === "all" || selectedCategory === "food" ? (
  <CategorySection title="Food" items={foods} {...handlers} />
) : null}

{selectedCategory === "all" || selectedCategory === "drink" ? (
  <CategorySection title="Drinks" items={drinks} {...handlers} />
) : null}

{selectedCategory === "all" || selectedCategory === "dessert" ? (
  <CategorySection title="Desserts" items={desserts} {...handlers} />
) : null}
       
{selectedCategory === "favorites" ? (
  <CategorySection title="Favorites" items={favorites} {...handlers} />
) : null}
    </div>
  );
};
export default MenuPage;