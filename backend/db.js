const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sreedhar3210:LnmOnlineForum@data.e6zqj.mongodb.net/?retryWrites=true&w=majority&appName=Data';

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