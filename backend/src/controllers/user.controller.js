const registerModel = require('../model/Temp.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mail = require('../service/emailVerfication')
const  uploadImage=require('../service/imageKit')
const Model1 = require('../model/UserModel.model')
require('dotenv').config()


async function register(req, res) {

    try{
    const { name, email, password, role, phone } = req.body;
    
    const result = await registerModel.findOne({
        $or: [{ phone }, { email }]
    })
    const result1 = await Model1.findOne({
        $or: [{ phone }, { email }]
    })
    if (result ) {

        return res.status(409).json({
            message: "unauthorized acess or user is already present"
        })
    }
    if (result1 ) {

        return res.status(409).json({
            message: "unauthorized acess or user is already present"
        })
    }

    const otp = await mail.mail(email)
    const newPassword = await bcrypt.hash(password, 10)
    const result2= await  uploadImage(req.file.buffer,"profile.jpg")
    const user=await registerModel.create({ name, email, password: newPassword, role, phone, Image:result2.url,otp } )
    res.status(200).json({
        message: "now verifying email ",

    })}catch(error){
        console.log(error)
    }
    
}

async function otpVerification(req, res) {
     
    try{
    
    const {email, otp } = req.body
    const result = await registerModel.findOne( { email })
    const result1 = await Model1.findOne({ email })

       if (result==null) {

        return res.status(409).json({
            message: "user don't exist restart"
        })
    }
       if (result1) {

        return res.status(409).json({
            message: "unauthorized acess or user is already present"
        })
    }
    
    
    if (result.otp == otp) {
        
     

     
     const user=await Model1.create({
        name:result.name, email:result.email, password:result.password, role:result.role , phone:result.phone , Image:result.Image
        })
        
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        res.cookie("token", token)
        await registerModel.deleteOne({ email })
       
        res.status(201).json({
            message: "user is created ",
           
        })

    }else{
        res.status(403).json({
            message:"unauthorized access"
        })
    }
    }catch(error){
      console.log(error)
}


}

async function login(req,res) {
    try{
    const {email,phone,password}=req.body
    const user = await Model1.findOne({
        $or:[{email},{phone}]
    })
    if(user){
      const result=  await bcrypt.compare(password,user.password)
      if(result){
        const token = await jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'7d'})
        res.cookie("token",token)
        res.status(200).json({
          message:"user login sucessfull"
        })
      }else{
        res.status(401).json({
            message:"user password is wrong"
        })
      }
    }else{
        res.status(404).json({
            message:"user is not created"
        })
    }

    }catch(error){
      console.log(error)
    }
    
}



async function logout(req,res) {
    try{
        const token=req.cookies.token
        const result = await jwt.verify(token,process.env.SECRET_KEY)

        if(result){
            res.clearCookie("token")
            res.status(200).json({
                message:"logout"
            })
        }else{
            res.status(401).json({
                message:"authorized"
            })
        }

    }catch(error){
        console.log(error)
    }

    
}

async function me(){
     try {
        const token=req.cookies.token
        const result=await jwt.verify(token,process.env.SECRET_KEY)
        if(result){
          const user= await Model1.findOne({id:result.id})
          res.status(200).json({
            user:user
          })
        }else{
           res.status(401).json({
            message:"unauthorized access"
           })
        }
     } catch (error) {
          console.log(error)
     }
}

module.exports = { register, otpVerification ,login, logout ,me}