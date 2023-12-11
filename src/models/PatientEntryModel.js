const mongoose = require("mongoose");

const PatientEntrySchema = new mongoose.Schema({
    entryDate: Date,
    treatment: String,
    condition: String,
    nursesNotes: String,
    annotations: String,
    daysStayed: Number,
    prescriptions: String,
    patient: {type: mongoose.Types.ObjectId, ref: 'Patient'}
});

const PatientEntry = mongoose.model('PatientEntry', PatientEntrySchema);

module.exports = {PatientEntry};