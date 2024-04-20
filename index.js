const express = require("express");

const { connectMongoDb } = require("./connection.js");
const { customMiddleware } = require("./middlewares");

const todoRouter = require("./routes/todo.js");

const app = express();

const PORT = 8000;

//CONNECTION
connectMongoDb("mongodb://127.0.0.1:27017/todo-app")
  .then(() => {
    console.log("Database connection open...");
  })
  .catch((err) => console.log("Error in establishing connection to DB", err));

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(customMiddleware());

// ROUTES
app.use("/api/todos", todoRouter);

//   Turn on server

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
