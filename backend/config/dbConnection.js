const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        //anslut till db
        const connect = await mongoose.connect(process.env.MONGO_URI);
        //logga
        console.log(`MongoDB connected:`,
        connect.connection.host,
        connect.connection.name
        );

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
}};

    module.exports = connectDB;