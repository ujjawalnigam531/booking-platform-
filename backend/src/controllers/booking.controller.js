const bookingModel = require('../model/Booking.model')
const facilityModel = require('../model/Facility.model')
 
async function createBooking(req, res) {
    try {
        const userId = req.user.id
        const { facility, date, timeSlot, sportType, customerName, phoneNumber, amount } = req.body
 
        if (!facility || !date || !timeSlot || !sportType || !customerName || !phoneNumber || !amount) {
            return res.status(400).json({ message: "all fields are required" })
        }
 
        const facilityExists = await facilityModel.findOne({ _id: facility })
        if (!facilityExists) {
            return res.status(404).json({ message: "facility not found" })
        }
 
        const booking = await bookingModel.create({
            facility,
            user: userId,
            customerName,
            phoneNumber,
            date,
            timeSlot,
            sportType,
            amount
        })
 
        res.status(201).json({
            message: "booking confirmed",
            booking
        })
 
    } catch (error) {
        // duplicate key error -> unique index on {facility, date, timeSlot} for confirmed bookings
        if (error.code === 11000) {
            return res.status(409).json({ message: "this slot is already booked" })
        }
        res.status(500).json({ message: "something went wrong", error })
    }
}
 
async function getAvailableSlots(req, res) {
    try {
        const { facilityId, date } = req.params
 
        const facility = await facilityModel.findOne({ _id: facilityId })
        if (!facility) {
            return res.status(404).json({ message: "facility not found" })
        }
 
        // generate hourly slots between openingTime and closingTime, e.g. "09:00" - "22:00"
        const allSlots = []
        let [openHour] = facility.openingTime.split(':').map(Number)
        let [closeHour] = facility.closingTime.split(':').map(Number)
 
        for (let hour = openHour; hour < closeHour; hour++) {
            const start = String(hour).padStart(2, '0') + ':00'
            const end = String(hour + 1).padStart(2, '0') + ':00'
            allSlots.push(`${start}-${end}`)
        }
 
        const bookedBookings = await bookingModel.find({
            facility: facilityId,
            date,
            status: "confirmed"
        })
        const bookedSlots = bookedBookings.map(b => b.timeSlot)
 
        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot))
 
        res.status(200).json({
            message: "available slots",
            allSlots,
            bookedSlots,
            availableSlots
        })
 
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}
 
async function getMyBookings(req, res) {
    try {
        const userId = req.user.id
        const bookings = await bookingModel.find({ user: userId })
            .populate('facility', 'name location Image')
            .sort({ createdAt: -1 })
 
        res.status(200).json({
            message: "my bookings",
            bookings
        })
 
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}
 
async function cancelBooking(req, res) {
    try {
        const userId = req.user.id
        const { id } = req.params
 
        const booking = await bookingModel.findOne({ _id: id })
        if (!booking) {
            return res.status(404).json({ message: "booking not found" })
        }
 
        if (booking.user.toString() !== userId) {
            return res.status(403).json({ message: "not allowed to cancel this booking" })
        }
 
        booking.status = "cancelled"
        await booking.save()
 
        res.status(200).json({
            message: "booking cancelled",
            booking
        })
 
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}
 
module.exports = { createBooking, getAvailableSlots, getMyBookings, cancelBooking }
 