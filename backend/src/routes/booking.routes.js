
const express = require('express')
const router = express.Router()
const bookingFunction = require('../controllers/booking.controller')
const isAuth = require('../middlwares/isAuth')
 
router.post('/createBooking', isAuth, bookingFunction.createBooking)
router.get('/availableSlots/:facilityId/:date', isAuth, bookingFunction.getAvailableSlots)
router.get('/myBookings', isAuth, bookingFunction.getMyBookings)
router.post('/cancel/:id', isAuth, bookingFunction.cancelBooking)
 
module.exports = router


