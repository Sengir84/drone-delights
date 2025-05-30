import FoodCard from "./FoodCard"

function CategorySection({ title, items, favorites, handleAddToCart, handleAddToFavorites }) {
    return (
    <section>
      <h2 className="category">{title}</h2>
      <div className="section-grid">
        {items.map(dish => (
          <FoodCard
            key={dish.id}
            dish={dish}
            handleAddToCart={handleAddToCart}
            handleAddToFavorites={handleAddToFavorites}
            isFavorite={favorites.some(item => item.id === dish.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;