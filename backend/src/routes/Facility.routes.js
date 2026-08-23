const  express=require('express')
const  router =express.Router()
const  facilityfunction=require('../controllers/facility.controller')
const upload=require('../middlwares/multer')
const  isAuth=require('../middlwares/isAuth')
router.post('/createFacility',isAuth,upload.single('Image'),facilityfunction.create)



module.exports=router