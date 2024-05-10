import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NewTodo from "./components/NewTodo";
import Todo from "./components/Todo";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState({});
  const [newStatus, setNewStatus] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/todos");
        setTodos(response.data.result);
        // console.log(todos._id);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchTodos();
  }, [todos]);

  return (
    <div
      className="app flex  justify-center pt-14"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Container>
        <Box className="flex flex-col gap-y-4 py-5">
          <Box className="flex items-center justify-between">
            <h1 className="text-3xl font-bold ">TODO</h1>
            <WbSunnyIcon />
          </Box>
          <NewTodo newTodo={newTodo} setNewTodo={setNewTodo} />
          <Box className="todo-list flex items-center   rounded-md flex-col">
            <Box className="new-todo flex items-center bg-gray-800 p-2  text-white justify-between w-full flex-col rounded-lg">
              {todos.map((todo) => {
                // console.log("todo id:", todo._id);
                return (
                  <Todo
                    key={todo._id}
                    id={todo._id}
                    description={todo.task}
                    status={todo.status}
                    todos={todos}
                    setTodos={setTodos}
                    newStatus={newStatus}
                    setNewStatus={setNewStatus}
                  ></Todo>
                );
              })}

              <Box className="new-todo flex items-center bg-gray-800 p-2  text-white justify-between w-full">
                <p>5 items left</p>
                <p>Clear Completed</p>
              </Box>
            </Box>
            <Box className="navigation flex items-center   w-full  justify-between py-2 px-20 bg-gray-800 text-white rounded-lg mt-5 ">
              <p>All</p>

              <p>Active</p>
              <p>Completed</p>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;
