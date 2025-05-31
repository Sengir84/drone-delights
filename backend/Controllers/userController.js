const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    //hämta data från req.body
    const {username, email, password} = req.body;

    //kontrollera att alla fält är ifyllda
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields");
    }

    //hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password", hashedPassword);
    
    
    //skapa användare i db
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log("User:", user);

    //kontrollera att användaren skapades
    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }

    
});


const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   //kontrollera att alla fält är ifyllda
    if (!email || !password) {
         res.status(400);
         throw new Error("Please include all fields");
    }

    //hämta användaren från db baserat på email
    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "100d" }
        );
        res.status(200).json({
            accessToken,
            username: user.username,
        });
    }else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

const updateUserCart = asyncHandler(async (req, res) =>{
    const userId = req.user.id;
    const { cart } = req.body;

    if (!Array.isArray(cart)) {
    res.status(400);
    throw new Error("Cart must be an array");
    }

    const user = await User.findById(userId);
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }
    user.cart = cart;
    await user.save();

    res.status(200).json({ cart: user.cart });
});

const updateUserFavorites = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { favorites } = req.body;

    if (!Array.isArray(favorites)) {
        res.status(400);
        throw new Error("Favorites must be an array");
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    user.favorites = favorites;
  await user.save();

  res.status(200).json({ favorites: user.favorites });
});

const getUserCartAndFavorites = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).select("cart favorites");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    cart: user.cart || [],
    favorites: user.favorites || [],
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;

  user.address.street = req.body.address?.street ?? user.address.street;
  user.address.city = req.body.address?.city ?? user.address.city;
  user.address.zip = req.body.address?.zip ?? user.address.zip;
  

  user.phone = req.body.phone || user.phone;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    address: updatedUser.address,
    phone: updatedUser.phone,
  });
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    updateUserCart,
    updateUserFavorites,
    getUserCartAndFavorites,
    getUserProfile,
    updateUserProfile,
    };