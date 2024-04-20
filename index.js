const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const todos = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000;

//CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/todo-app")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("There was an error: ", err));
//SCHEMA
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});
//MODEL
const Todo = mongoose.model("todo", todoSchema);

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

// GET AND POST REQUESTS

app
  .route("/api")
  .get(async (req, res) => {
    const result = await Todo.find({});
    res.status(200).json({ status: "success", result });
  })
  .post(async (req, res) => {
    const body = req.body;

    const result = await Todo.create({
      task: body.task,
      status: true,
    });

    res.status(201).json({
      status: "success",
      result,
    });
  });

// GET - ACTIVE TODOS

app.get("/api/active", async (req, res) => {
  const result = await Todo.find({ status: true });
  res.status(200).json({ status: "success", result });
});

// GET - COMPLETED TODOS

app.get("/api/completed", async (req, res) => {
  const result = await Todo.find({ status: false });
  res.status(200).json({ status: "success", result });
});

//PATCH REQUESTS AND DELETE REQUESTS HANDLING

app
  .route("/api/:id")
  .patch(async (req, res) => {
    // TODO: Implement patch for all todos
    const editedTodo = req.body;

    const result = await Todo.updateOne(
      { _id: req.params.id },
      { $set: editedTodo }
    );

    res.status(200).json({ status: "success", result });
  })
  .delete(async (req, res) => {
    // const todoId = Number(req.params.id);

    const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({ status: "success", deletedTodo });
  });

//   Turn on server

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
