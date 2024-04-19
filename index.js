const express = require("express");
const fs = require("fs");
const todos = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000;

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

app.post("/api/active", (req, res) => {
  const newTodo = req.body;
  todos.push({ ...req.body });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(todos), (err) => {
    if (err)
      return res.status(500).json({
        status: "error",
        message: "There was an error in submitting your form on server.",
      });
    else
      res.status(200).json({
        status: "success",
        message: "Your form was submitted.",
        submitted_response: req.body,
      });
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
    else res.status(404).json({ status: "error", message: " Todo not found" });
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
    // TODO: Implement Patch for active todos only
  })
  .delete((req, res) => {
    // TODO: Implement Delete for active todos only
  });

app
  .route("/api/completed/:id")
  .patch((req, res) => {
    // TODO: Implement Patch for completed todos only
  })
  .delete((req, res) => {
    // TODO: Implement Delete for completed todos only
  });

//   Turn on server

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});