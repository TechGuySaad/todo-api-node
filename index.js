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

// GET REQUESTS HANDLING

app.get("/api", (req, res) => {
  res.status(200).json({ status: "success", todos });
});

app.get("/api/active", (req, res) => {
  const active_tasks = todos.filter((task) => task.status === true);
  res.status(200).json({ status: "success", active_tasks });
});

app.get("/api/completed", (req, res) => {
  const completed_tasks = todos.filter((task) => task.status === false);
  res.status(200).json({ status: "success", completed_tasks });
});

// POST REQUESTS HANDLING

app.post("/api/active", async (req, res) => {
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

//PATCH REQUESTS AND DELETE REQUESTS HANDLING

app
  .route("/api/:id")
  .patch((req, res) => {
    // TODO: Implement patch for all todos
    const editedTodo = { ...req.body };
    const todo = todos.find((todo) => todo.id === Number(req.params.id));
    if (editedTodo.task !== todo.task) {
      editedTodo.id = todo.id;
      todo.task = editedTodo.task;
    }
    if (editedTodo.status !== todo.status) {
      editedTodo.id = todo.id;
      todo.status = editedTodo.status;
    }
    const index = todos.findIndex((todo) => todo.id === Number(req.params.id));
    if (index !== -1) todos[index] = editedTodo;
    else res.status(404).json({ status: "error", message: "Todo not found" });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(todos), (err) => {
      console.log(err);
    });
    res.status(200).json(todos);
  })
  .delete((req, res) => {
    const todoId = Number(req.params.id);
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(filteredTodos), (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update todos" });
      else res.status(200).json({ status: success, todos: filteredTodos });
    });

    res.json({ status: "success", todos: filteredTodos });
  });

app
  .route("/api/active/:id")
  .patch((req, res) => {
    const editedTodo = { ...req.body };
    let todo = todos.find(
      (todo) => todo.id === Number(req.params.id) && todo.status === true
    );
    todo = { id: Number(req.params.id), ...todo, ...editedTodo };
    // res;

    const index = todos.findIndex((todo) => todo.id === Number(req.params.id));
    if (index !== -1) todos[index] = todo;
    else res.status(404).json({ status: "error", message: "Todo not found" });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(todos), (err) => {
      console.log(err);
    });

    res.status(200).json({ status: "success", todo: todos[index] });
  })
  .delete((req, res) => {
    const todoId = Number(req.params.id);
    const filteredTodos = todos.filter(
      (todo) => todo.id !== todoId && todo.status === true
    );

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(filteredTodos), (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update todos" });
      else res.status(200).json({ status: success, todos: filteredTodos });
    });

    res.json({ status: "success", todos: filteredTodos });
  });

app
  .route("/api/completed/:id")
  .patch((req, res) => {
    const editedTodo = { ...req.body };
    let todo = todos.find(
      (todo) => todo.id === Number(req.params.id) && todo.status === false
    );
    todo = { id: Number(req.params.id), ...todo, ...editedTodo };
    // res;

    const index = todos.findIndex((todo) => todo.id === Number(req.params.id));
    if (index !== -1) todos[index] = todo;
    else res.status(404).json({ status: "error", message: "Todo not found" });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(todos), (err) => {
      console.log(err);
    });

    res.status(200).json({ status: "success", todo: todos[index] });
  })
  .delete((req, res) => {
    const todoId = Number(req.params.id);
    const filteredTodos = todos.filter(
      (todo) => todo.id !== todoId && todo.status === false
    );

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(filteredTodos), (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update todos" });
      else res.status(200).json({ status: success, todos: filteredTodos });
    });

    res.json({ status: "success", todos: filteredTodos });
  });

//   Turn on server

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
