const mongoose =require('mongoose')
require('dotenv').config()
async function connecting(){
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("server is connected with database")
    }catch(error){
      console.log(error)
    }
}

module.exports=connecting