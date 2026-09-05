const express=require('express')
const app=express()
const cors=require('cors')


app.use(express.json())
const cookieParser=require('cookie-parser')
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser())
require('dotenv').config()
const authRouter=require('./routes/auth.routes')
const facilityRouter=require('./routes/Facility.routes')
const bookingRouter=require('./routes/booking.routes')
app.use("/api/auth",authRouter)
app.use("/api/facility",facilityRouter)
app.use("/api/booking",bookingRouter)
module.exports=app