//Api routes helper, change the routes here to change the api routes in the whole project
const BASE_URL = "http://localhost:3001/api/users";

const API_ROUTES = {
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  CURRENT: `${BASE_URL}/current`,
  USER_CART: `${BASE_URL}/cart`,
  USER_FAVORITES: `${BASE_URL}/favorites`,
  USER_CART_FAVORITES: `${BASE_URL}/cartfavorites`,
};

export default API_ROUTES;