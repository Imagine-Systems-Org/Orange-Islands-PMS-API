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
    profession: String
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};