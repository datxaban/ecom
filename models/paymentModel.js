const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: [],
    },
    paymentID: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Payments", paymentSchema)