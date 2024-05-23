const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  content: { type: String },
  status: {
    type: String,
    enum: ["todo", "inprogress", "completed"],
    default: "todo",
  },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, requird: true },
  password: { type: String, required: true },
  tasks: [taskSchema],
});

module.exports = mongoose.model("Users", userSchema);
