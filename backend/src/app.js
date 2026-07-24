const express=require('express')
const app=express()
app.use(express.json())
require('dotenv').config()
const cookieParser=require('cookie-parser')
const authRouter=require('./routes/auth.routes')
app.use("/api/auth",authRouter)
app.use(cookieParser(process.env.SECRET_KEY))

module.exports=app