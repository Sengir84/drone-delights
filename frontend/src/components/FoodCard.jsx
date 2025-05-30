import "./FoodCard.css";

function FoodCard({ dish, handleAddToCart, handleAddToFavorites, isFavorite }) {
  return (
    <div className="food-card">
      <img src={dish.image} alt={dish.name} />
      <h3 className="food-name">{dish.name}</h3>
      <p className="food-desc">{dish.description}</p>
      <p className="food-price">{dish.price} kr</p>
      <p className="food-rating">Rating: {dish.rating} ⭐</p>


      <div className="card-buttons">
      {handleAddToCart && (
        <button  onClick={() => handleAddToCart(dish)}>🛒 Add to cart</button>
      )}

      {handleAddToFavorites && (
        <button onClick={() => handleAddToFavorites(dish)}>
          {isFavorite ? "💖 Remove favorite" : "🤍 Add to favorites"}
        </button>
      )}
      </div>
    </div>
    
  );
  
}

export default FoodCard;