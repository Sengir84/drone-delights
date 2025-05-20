require("dotenv").config();
const express = require('express');


const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

