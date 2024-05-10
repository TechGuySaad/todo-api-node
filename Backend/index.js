const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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

app.set("view engine", "ejs");

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(customMiddleware());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
// ROUTES
app.use("/api/todos", todoRouter);

//   Turn on server

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
