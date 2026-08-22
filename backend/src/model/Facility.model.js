const mongoose=require('mongoose')



const facilitySchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"model",
        required:true
    },
    name:{
        type:string,
        required:true
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
    sportAvailable:[{type:string,enum:["Cricket","Football","VolleyBall","BasketBall"]}],
    Image:{
        type:string,
        required:true
    }
},{timestamps:true})

const facilityModel=mongoose.model("Facility",facilitySchema)
module.exports=facilityModel