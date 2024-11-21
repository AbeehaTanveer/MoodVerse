import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState()
  const [current,setCurrent]=useState(null)

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = async () => {
    try {
      if(inputValue.length===0){
        return
      }
      if(current==null){

        const response = await axios.post("http://localhost:8001/api/add", {
          data: inputValue,
        });
        console.log(response.data);
        setInputValue("");
        setSuccessMessage("Task added successfully!");
        GetData(); // Refresh task list
      }
      else{

        const res=axios.put(`http://localhost:8001/api/update/${current}` ,{data:inputValue})
        
    setTasks((prev)=>prev.map((task)=>{
     return task._id===current? {...task,data:inputValue}:task
    }))

   

  
        setInputValue("")
        setSuccessMessage("Data is Update Successfully")
        setCurrent(null)

      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetData = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/get");
      setTasks(response.data);
      console.log("the data is fetched",response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

const handleDelete=async(id)=>{

  try {

    const response= await axios.delete(`http://localhost:8001/api/delete/${id}`);
    console.log(response)
setSuccessMessage("Data Delete Successfully")
    GetData()
  } catch (error) {
    console.log(error);
  }


  
}



const handleUpdate=(task,id)=>{

setInputValue(task)
setCurrent(id)
}


  // Mark Task as Completed
  const handleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
  );
  setSuccessMessage(tasks.completed ? "task is Done":"")
    setTasks(updatedTasks);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        background: "#f4faff",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        ToDo List <span>📝</span>
      </Typography>

      {/* Input Field */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          onKeyPress={handleKeyPress}
          fullWidth
          placeholder="Add your task"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton color="primary" sx={{ fontSize: "30px" }}>
          <AddCircleIcon onClick={handleAdd} fontSize="large" />
        </IconButton>
      </Box>

      {/* Success Message */}
      {successMessage && (
        <Typography
          variant="body2"
          sx={{
            color: "green",
            marginBottom: "20px",
          }}
        >
          {successMessage}
        </Typography>
      )}

      {/* Task List */}
      {tasks.map((task, index) => (
        <Paper
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            maxWidth: "500px",
            background: task.completed ? "#d7f3d1" : "white",
            
          }}
        >
  <IconButton
              color="success"
              onClick={() => handleCompleteTask(index)}
              sx={{ marginRight: 2 }}
            >
              <CheckCircleOutlineIcon />
            </IconButton>
          <Typography
        
            variant="body1"
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              color: "#333",
            }}
          >
            {task.data}
          </Typography>
          <Box>
          
            <IconButton color="error" sx={{ marginLeft: 1 }}>
              <DeleteIcon onClick={()=>handleDelete(task._id)} />
            </IconButton>

            <IconButton color="primary" sx={{ marginLeft: 2 }}>
              {/* yhn pe object kun ni likha ha yhn pe ( ) is ka ander hi access kr lia ha isa */}
              <EditIcon  onClick={()=>{handleUpdate(task.data,task._id)}}  />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default TodoList;
