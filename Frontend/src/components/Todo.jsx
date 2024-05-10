import { Box, Checkbox } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import axios from "axios";
import { useEffect } from "react";

const Todo = ({
  id,
  description,
  status,
  todos,
  setTodos,
  newStatus,
  setNewStatus,
}) => {
  // console.log("id:", id);

  const apiRoute = id && `http://localhost:8000/api/todos/${id}`;
  const handleStatus = async () => {
    setNewStatus(!status);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/todos/${id}`,
        {
          // Your data to be patched
          status: !status,
        }
      );
      // Update state with the response data

      console.log("Patch successful");
    } catch (error) {
      console.error("Patch failed:", error);
    }
  };
  function deleteObjectById(array, id) {
    // Find the index of the object with matching _id
    const index = array.findIndex((obj) => obj._id === id);
    // If the object exists in the array, remove it
    if (index !== -1) {
      array.splice(index, 1);
    }
    setTodos(array);
  }

  const handleDeleteTodo = () => {
    // console.log("api route:", apiRoute);
    axios
      .delete(apiRoute)
      .then((response) => {
        console.log("Deleted successfully:", response.data);
        deleteObjectById(todos, id);
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  };
  return (
    <Box className="flex items-center border-b-gray-400 border-b-2 w-full  justify-between pr-2">
      <Checkbox
        key={id}
        style={{ color: "white" }}
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={status} // If status is true, checkbox will be checked
        onClick={handleStatus}
      />
      <p className="text-white">{description && description}</p>
      <ClearIcon style={{ color: "white" }} onClick={handleDeleteTodo} />
    </Box>
  );
};

export default Todo;
