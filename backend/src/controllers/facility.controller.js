const facilityModel = require('../model/Facility.model')
const Model1 = require('../model/UserModel.model')
const uploadImage = require('../service/imageKit')
async function create(req, res) {
    try {

        const id = req.user.id
        const user1 = await Model1.findOne({ _id: id })
        const { name, location, perHourPrice, openingTime, closingTime, sportAvailable } = req.body
      
        if (user1.role == "owner") {
            const result = await facilityModel.findOne({
                $or: [{ name }, { location }]
            })
            if (result) {
                return res.status(409).json({
                    message: "facility is allready present"
                })
            }
            const newImage = await uploadImage(req.file.buffer, "facility.jpg")
            let parsedSports = sportAvailable
           if (typeof sportAvailable === "string") {
            parsedSports = JSON.parse(sportAvailable)
           }
            
            await facilityModel.create({
                owner:id, name, location, perHourPrice, openingTime, closingTime, sportAvailable:parsedSports, Image: newImage.url
            })

            res.status(201).json({
                message: "facility is created "
            })


        }else{
            res.status(403).json({
                message:"only owner are allowed to created facility"
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong",
            error
         })
    }


}

async function get(req,res){
   const facility= await facilityModel.find().limit(1)
   res.status(200).json({message:"list",
       facility
   })
}

module.exports = { create ,get}



