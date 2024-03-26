const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String, // Use String as data type
        required: true // Example: Required field
    },
    otpCode: {
        type: String,
        required: true
    }
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = { OTP };
