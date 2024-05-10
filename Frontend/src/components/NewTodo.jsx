import { Box, FormControlLabel, Radio, Input } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const NewTodo = ({ newTodo, setNewTodo }) => {
  const [newTask, setNewTask] = useState({ task: "", status: false });

  const handleAddNewTodo = async () => {
    // console.log("New Task:", newTask);
    try {
      const response = await axios.post("http://localhost:8000/api/todos", {
        ...newTask,
      });

      console.log("Added new todo successfully");
      setNewTodo({ ...newTask });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box className="new-todo flex items-center bg-gray-800 p-2 rounded-lg  w-full justify-between">
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio style={{ color: "gray" }} />}
        />
        <Input
          placeholder="Create a new todo..."
          fullWidth
          disableUnderline
          style={{ color: "white", caretColor: "white", fontSize: "14px" }}
          // onKeyDown={handleAddNewTodo}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddNewTodo();
            }
          }}
          onChange={(e) => {
            setNewTask({ ...newTask, task: e.target.value });
          }}
        />
      </Box>
    </>
  );
};

export default NewTodo;
