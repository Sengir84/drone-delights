const express = require('express');
const { 
    loginUser, 
    currentUser, 
    registerUser,
    updateUserCart,
    updateUserFavorites,
    getUserCartAndFavorites,
    } = require('../controllers/userController');

const validateToken = require('../middleware/validateTokenHandler');
const ROUTES = require('../constants/APIroutes');

const router = express.Router();

//User routes
router.post(ROUTES.REGISTER, registerUser);           
router.post(ROUTES.LOGIN, loginUser);                 
router.get(ROUTES.CURRENT, validateToken, currentUser);  

//Cart and favorites routes
router.put(ROUTES.USER_CART, validateToken, updateUserCart);             
router.put(ROUTES.USER_FAVORITES, validateToken, updateUserFavorites);   
router.get(ROUTES.USER_CART_FAVORITES, validateToken, getUserCartAndFavorites); 


module.exports = router;