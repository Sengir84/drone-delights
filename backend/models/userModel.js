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
    cart:[
        {
            id: String,
            name: String,
            price: Number,
            quantity: Number,
        }
    ],
 favorites: [
    {
      id: String,
      name: String,
      price: Number,
    },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);