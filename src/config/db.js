const mongoose = require('mongoose');

const connectMongo = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectMongo;