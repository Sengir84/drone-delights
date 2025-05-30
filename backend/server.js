require("dotenv").config();
const express = require('express');
const cors = require("cors");

const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

