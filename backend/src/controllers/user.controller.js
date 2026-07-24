const registerModel=require('../model/user.model') 
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const registerFun={
    register:async (req,res)=>{
       const {name,email,password,role,phone,Image}=req.body;
       const result=await registerModel.findOne({
        $or:[{phone},{email}]})
       if(result!=null){

           return res.status(403).json({
               message:"unauthorized acess or user is already present"
           })
       }
        const newPassword= await bcrypt.hash(password,10)
        const user = await registerModel.create({
            name,email,password:newPassword,role,phone,Image
        })
        const token = await jwt.sign({id:user._id},process.env.SECRET_KEY, { expiresIn: '7d' })
        res.cookie("token",token, { 
                   // Tells Express to sign this cookie
            httpOnly: true,        // Prevents client-side JS access
            secure: true           // Requires HTTPS connections
             }) 
  
        const users=await registerModel.findOne({name:user.email}).select('-password')
        res.status(201).json({
           message:"user is created ",
           users 
        })
       
    }
}

module.exports=registerFun