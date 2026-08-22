const mongoose=require('mongoose')

const tempSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
      
    },
    otp:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
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
       
    },
    Image:{
        type:String,
        required:true
    },
    createdAt: { type: Date, default: Date.now, expires: 300 }

})

const registerModel=mongoose.model("user",tempSchema)
module.exports=registerModel
