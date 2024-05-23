const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.mongoDB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.error('Error connecting to mongoDB ', error)
    process.exit(1)
  }
};


module.exports = connectDB;