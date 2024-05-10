//route handlers are actually the controllers

const Todo = require("../models/todo");

async function handleNewTodo(req, res) {
  const body = req.body;
  console.log(body);
  const result = await Todo.create({
    task: body.task,
    status: true,
  });

  return res.status(201).json({
    status: "success",
    result,
  });
}

async function handleGetAllTodos(req, res) {
  const result = await Todo.find({});
  return res.status(200).json({ status: "success", result });
}

async function handleGetAllActiveTodos(req, res) {
  const result = await Todo.find({ status: true });
  return res.status(200).json({ status: "success", result });
}

async function handleGetAllCompletedTodos(req, res) {
  const result = await Todo.find({ status: false });
  return res.status(200).json({ status: "success", result });
}

async function handleUpdateTodoById(req, res) {
  // TODO: Implement patch for all todos
  const editedTodo = req.body;

  const result = await Todo.updateOne(
    { _id: req.params.id },
    { $set: editedTodo }
  );

  return res.status(200).json({ status: "success", result });
}

// async function handleDeleteById(req, res) {
//   const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params.id });

//   return res.status(200).json({ status: "success", deletedTodo });
// }
async function handleDeleteById(req, res) {
  try {
    console.log("This is id", req.params.id);
    const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params.id });

    if (!deletedTodo) {
      return res
        .status(404)
        .json({ status: "error", message: "Todo not found" });
    }

    return res.status(200).json({ status: "success", deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
}
module.exports = {
  handleGetAllTodos,
  handleGetAllActiveTodos,
  handleGetAllCompletedTodos,
  handleUpdateTodoById,
  handleDeleteById,
  handleNewTodo,
};
