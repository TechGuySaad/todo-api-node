const mongoose = require("mongoose");

//SCHEMA
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

//MODEL
const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
