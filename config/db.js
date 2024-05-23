const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abhinavbmanoj:4mEq5UgBIA39LkjB@cluster0.ysjc0tt.mongodb.net/kanban-app",
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