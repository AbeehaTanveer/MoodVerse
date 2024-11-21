const mongoose=require("mongoose");


const MONGO_URL="mongodb://uzair:qguWxS6JUcp96gYq@ac-fz7vr0s-shard-00-00.crenx4w.mongodb.net:27017,ac-fz7vr0s-shard-00-01.crenx4w.mongodb.net:27017,ac-fz7vr0s-shard-00-02.crenx4w.mongodb.net:27017/?ssl=true&replicaSet=atlas-9ffzh2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=abeez"
mongoose.connect(MONGO_URL);

 function DB_Connection(){

 mongoose.connection.on("connected",()=>{
    console.log("DataBase is Connection 😀 ")
})
mongoose.connection.on("disconneted",()=>{
    console.log("DataBase not Connect ❌")
})
mongoose.connection.on("error",()=>{
    console.log(error)
})


}

module.exports={DB_Connection}