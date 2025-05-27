import { useEffect, useState } from "react";
import axios from "axios";

function MenuPage() {
    const [dishes, setDishes] = useState([]);

      useEffect(() => {
    axios.get("http://localhost:3000/menu")
      .then((res) => setDishes(res.data))
      .catch((err) => console.error("Kunde inte hämta meny", err));
  }, []);

  return (
    <div>
      <h1>Menu</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dishes.map(dish => (
          <div key={dish.id} className="border p-4 rounded-lg shadow">
            <img src={dish.image} alt={dish.name} className="w-full h-32 object-cover rounded" />
            <h2 className="text-lg font-bold mt-2">{dish.name}</h2>
            <p>{dish.description}</p>
            <p className="text-green-600 font-semibold">{dish.price} kr</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MenuPage;