const express = require('express');
const { loginUser, currentUser, registerUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const ROUTES = require('../constants/APIroutes');

const router = express.Router();

router.post(ROUTES.REGISTER, registerUser);
router.post(ROUTES.LOGIN, loginUser);
router.get(ROUTES.CURRENT, validateToken, currentUser);

module.exports = router;