const registerModel = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mail = require('../service/emailVerfication')
require('dotenv').config()


async function register(req, res) {
    const { name, email, password, role, phone, Image } = req.body;
    const result = await registerModel.findOne({
        $or: [{ phone }, { email }]
    })
    if (result != null) {

        return res.status(409).json({
            message: "unauthorized acess or user is already present"
        })
    }
    res.status(200).json({
        message: "now verifying email ",

    })
     await mail.mail(email)
    obj = { name, email, password, role, phone, Image }
    
    
}

async function otpVerification(req, res) {
    const { name, email, password, role, phone, Image } =obj
    const { otp } = req.body

      if (mail.otp == otp) {
        const newPassword = await bcrypt.hash(password, 10)

        const user = await registerModel.create({
            name, email, password: newPassword, role, phone, Image
        })
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true
        })

        const users = await registerModel.findOne({ name: user.email }).select('-password')
        res.status(201).json({
            message: "user is created ",
            users
        })

    }

    if(mail.otp!=otp){
        res.status(403).json({
            message:"unauthorized access"
        })
    }



}



module.exports = { register, otpVerification }



























//   const { name, email, password, role, phone, Image } = req.body;
//     const result = await registerModel.findOne({
//         $or: [{ phone }, { email }]
//     })
//     if (result != null) {

//         return res.status(409).json({
//             message: "unauthorized acess or user is already present"
//         })
//     }
   // const newPassword= await bcrypt.hash(password,10)

    // const user = await registerModel.create({
    //     name,email,password:newPassword,role,phone,Image
    // })
    // const token = await jwt.sign({id:user._id},process.env.SECRET_KEY, { expiresIn: '7d' })
    // res.cookie("token",token, {        
    //     httpOnly: true,        
    //     secure: true           
    //      }) 

    // const users=await registerModel.findOne({name:user.email}).select('-password')
    // res.status(201).json({
    //    message:"user is created ",
    //    users 
    // })