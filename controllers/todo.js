//route handlers are actually the controllers

const Todo = require("../models/todo");

async function handleNewTodo(req, res) {
  const body = req.body;

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

async function handleDeleteById(req, res) {
  const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params.id });

  return res.status(200).json({ status: "success", deletedTodo });
}
module.exports = {
  handleGetAllTodos,
  handleGetAllActiveTodos,
  handleGetAllCompletedTodos,
  handleUpdateTodoById,
  handleDeleteById,
  handleNewTodo,
};
