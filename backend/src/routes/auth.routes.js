const express=require('express')
const router=express.Router()
const registerFun=require('../controllers/user.controller')
router.post('/userRegister', registerFun.register)
router.post('/otp',registerFun.otpVerification)

module.exports=router