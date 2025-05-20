//registerUser
//route post /api/users/register
//access public
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
            { expiresIn: "15m" }
        );
        res.status(200).json({
            accessToken,
        });
    }else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    };