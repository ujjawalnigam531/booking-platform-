const express=require('express')
const router=express.Router()
const registerFun=require('../controllers/user.controller')
router.post('/userRegister', registerFun.register)


module.exports=router