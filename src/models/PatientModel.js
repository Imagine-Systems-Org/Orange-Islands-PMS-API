const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name: String,
    species: String,
    category: String,
    dateOfBirth: Date,
    assignedDoctor: {type: mongoose.Types.lastName, ref: 'User'},
    assignedNurse: {type: mongoose.Types.lastName, ref: 'User'},
    bed: String,
    trainer: [{ 
        firstName: String, 
        lastName: String, 
        phone: String }]
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = {Patient};