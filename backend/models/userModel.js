const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter a username"],
    },
    email: {
        type: String,
        required: [true, "please enter a email"],
        unique: [true, "email already exists"],
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
    },
}, 
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);