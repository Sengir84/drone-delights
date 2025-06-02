
// This file defines the routes and is for navigating the Drone Delights application.
const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MENU: '/menu',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PRODUCT_DETAIL: (id) => `/menu/${id}`, // dynamic
  PROFILE: '/profile',
};

export default ROUTES;