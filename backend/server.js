const app =require('./src/app')
require('dotenv').config()
const PORT= process.env.PORT || 5000
const connecting=require('./src/db/db')
connecting()

app.listen(PORT,()=>{
    console.log("server is running on port number 5000")
})