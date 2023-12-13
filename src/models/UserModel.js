const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    employeeID: {
        type: String,
        required: true,
    },
    email: String,
    password: {
        type: String,
        required: true
    },
    phone: String,
    profession: {
        type: String,
        enum: ["Nurse", "Doctor", "Pharmacist"]
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};