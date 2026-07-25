const mongoose=require('mongoose')

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
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
        unique:true
    },
    Image:{
        type:String,
        required:true
    },
    createdAt: { type: Date, default: Date.now, expires: 300 }

})

const optModel=mongoose.model("otp",otpSchema)
module.exports=optModel