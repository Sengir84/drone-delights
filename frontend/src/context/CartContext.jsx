import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false); 

  // Total price calculation
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }, [cart]);

 
  const handleAddToCart = (dish) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === dish.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === dish.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  
  const handleAddToFavorites = (dish) => {
    setFavorites(prevFavs => {
      const isAlreadyFavorite = prevFavs.some(item => item.id === dish.id);
      if (isAlreadyFavorite) {
        return prevFavs.filter(item => item.id !== dish.id);
      }
      return [...prevFavs, dish];
    });
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:3001/api/users/cartfavorites", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          console.log("Fetched from backend:", res.data);
          setCart(res.data.cart || []);
          setFavorites(res.data.favorites || []);
          setHasLoaded(true);
        })
        .catch(err => console.error("Failed to fetch cart/favorites", err));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, hasLoaded]);

  // Save favorites to localStorage
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, hasLoaded]);

  // Sync cart with backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && hasLoaded) {
      axios.put("http://localhost:3001/api/users/cart", { cart }, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(err => console.error("Failed to save cart", err));
    }
  }, [cart, hasLoaded]);

  // Sync favorites with backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && hasLoaded) {
      axios.put("http://localhost:3001/api/users/favorites", { favorites }, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(err => console.error("Failed to save favorites", err));
    }
  }, [favorites, hasLoaded]);

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      favorites,
      setFavorites,
      totalPrice,
      handleAddToCart,         
      handleAddToFavorites     
    }}>
      {children}
    </CartContext.Provider>
  );
};