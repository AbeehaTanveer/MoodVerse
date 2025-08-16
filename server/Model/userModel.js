const mongoose=require("mongoose")
const { Schema } = mongoose;

const userModel = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
     }

    ,
    email:{
        type:String,
        required:true,
        trim:true,
    }
    ,
    password:{
        type:String,
        required:true,
        trim:true,
    },
    confirmPassword:{
        type:String,
        // required:true,
        trim:true,

    }


});
const Profile = mongoose.model('profile', userModel);
module.exports= Profile;