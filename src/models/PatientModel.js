const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name: String,
    species: String,
    category: String,
    dateOfBirth: Date,
    assignedDoctor: {type: mongoose.Types.ObjectId, ref: 'User'},
    assignedNurse: {type: mongoose.Types.ObjectId, ref: 'User'},
    bed: String,
    trainerName: String,
    trainerPhone: String
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = {Patient};