const mongoose=require('mongoose')



const facilitySchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"model",
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
    },
    perHourPrice:{
        type:String,
        required:true
    },
    openingTime:{
        type:String,
        required:true
    },
    closingTime:{
        type:String,
        required:true
    },
    sportAvailable:[{type:String,enum:["Cricket","Football","VolleyBall","BasketBall"]}],
    Image:{
        type:String,
        required:true
    }
},{timestamps:true})

const facilityModel=mongoose.model("Facility",facilitySchema)
module.exports=facilityModel