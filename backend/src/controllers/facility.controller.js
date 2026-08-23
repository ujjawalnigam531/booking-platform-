const facilityModel=require('../model/Facility.model')
const Model1=require('../model/UserModel.model')
const uploadImage=require('../service/imageKit')
async function create(req,res) {
    try{

        const id=req.user.id
       const user =await Model1.findOne({_id:id}) 
       if(user.role=="owner"){
        const { name, location, perHourPrice, openingTime, closingTime, sportAvailable, Image } = req.body
        const result = await facilityModel.findOne({
            $or:[{name},{location}]
       })
       if(result){
       return res.status(409).json({
        message:"facility is allready present"
       })
       const newImage= await uploadImage(req.file.buffer,"facility.jpg")
       await facilityModel.create({
        name, location, perHourPrice, openingTime, closingTime, sportAvailable, Image:newImage
       })

       res.status(201).json({
        message:"facility is created "
       })
       }

       }
    }catch(error){
        console.log(error)
    }

    
}


module.exports={create}