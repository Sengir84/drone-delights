const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MENU: '/menu',
  PRODUCT_DETAIL: (id) => `/menu/${id}`, // dynamic
  PROFILE: '/profile',
};

export default ROUTES;