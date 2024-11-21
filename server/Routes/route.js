const express =require("express")
const { addTodo, getTodo, DeleteTodo, updateTodo } = require("../controller/controller")
const route=express.Router()

route.post("/add",addTodo)
route.get("/get",getTodo)
route.delete("/delete/:id",DeleteTodo)
route.put("/update/:id",updateTodo)


module.exports={route}