const express = require("express");
const {
  handleGetAllTodos,
  handleGetAllActiveTodos,
  handleGetAllCompletedTodos,
  handleUpdateTodoById,
  handleDeleteById,
  handleNewTodo,
} = require("../controllers/todo");
const router = express.Router();

router.route("/home").get(handleGetAllTodos).post(handleNewTodo);

// GET - ACTIVE TODOS

router.get("/active", handleGetAllActiveTodos);

// GET - COMPLETED TODOS

router.get("/complete", handleGetAllCompletedTodos);

//PATCH REQUESTS AND DELETE REQUESTS HANDLING

router.route("/:id").patch(handleUpdateTodoById).delete(handleDeleteById);

module.exports = router;
