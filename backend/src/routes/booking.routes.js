
const express = require('express')
const router = express.Router()
const bookingFunction = require('../controllers/booking.controller')
const isAuth = require('../middlwares/isAuth')
const BookingModel = require('../model/Booking.model')
 
router.post('/createBooking', isAuth, bookingFunction.createBooking)
router.get('/availableSlots/:facilityId/:date', isAuth, bookingFunction.getAvailableSlots)
router.get('/myBookings', isAuth, bookingFunction.getMyBookings)
router.post('/cancel/:id', isAuth, bookingFunction.cancelBooking)
router.patch('/payment/:id',isAuth,bookingFunction.payment)
module.exports = router


