const mongoose =require("mongoose")

const Todo_Schema=new mongoose.Schema({

    data:String
})

const Todo=mongoose.model("task",Todo_Schema);
module.exports={Todo}