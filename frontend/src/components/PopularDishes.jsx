import { useEffect, useState, useContext } from "react";
import FoodCard from "./FoodCard";
import "./PopularDishes.css"; 
import { CartContext } from "../context/CartContext";

const PopularDishes = () => {
  const [popularDishes, setPopularDishes] = useState([]);
  const { handleAddToCart, handleAddToFavorites, favorites } = useContext(CartContext);


  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a, b) => b.orders - a.orders)
          .slice(0, 8); 
        setPopularDishes(sorted);
      });
  }, []);

  return (
    <section className="popular-dishes">
      <h2 className="text-2xl font-bold mb-4">Our Most Popular Dishes</h2>
      <div className="popular-grid">
        {popularDishes.map((dish) => (
          <FoodCard 
          key={dish.id} 
          dish={dish} 
          handleAddToCart={handleAddToCart}
          handleAddToFavorites={handleAddToFavorites}
          isFavorite={favorites.some(fav => fav.id === dish.id)}
          />
        ))}
      </div>
      
    </section>
  );
};

export default PopularDishes;