const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
         type:String,
         enum:["admin","user","owner"],
         required:true,
         default:"user"
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    Image:{
        type:String,
        required:true
    }

}) 

const registerModel=mongoose.model("user",userSchema)
module.exports=registerModel