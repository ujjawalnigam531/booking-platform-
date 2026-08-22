const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    sportType: { type: String, enum: ["Soccer", "Cricket", "Tennis", "Baseball"], required: true },
    amount: { type: Number, required: true },
    

    status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
    
    
    paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
    paymentMethod: { type: String, default: "cash" }

}, { timestamps: true })

bookingSchema.index(
    { facility: 1, date: 1, timeSlot: 1 },
    {
        unique: true,
        partialFilterExpression: { status: "confirmed" }
    }
)

module.exports = mongoose.model("Booking", bookingSchema)