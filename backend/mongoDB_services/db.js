const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(">>>> Connected to the database successfully");
    } catch (error) {
        console.error(">>>> Failed to connect to the database:", error);
    }
}

module.exports = mongoDB;