const express=require('express')
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
require('dotenv').config()
const cookieParser=require('cookie-parser')
const authRouter=require('./routes/auth.routes')
app.use("/api/auth",authRouter)
app.use(cookieParser())

module.exports=app