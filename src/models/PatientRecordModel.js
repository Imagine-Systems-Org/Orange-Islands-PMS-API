const mongoose = require("mongoose");

const PatientRecordSchema = new mongoose.Schema({
    entryDate: {
        type: Date,
        default: Date.now
    },
    treatment: String,
    condition: String,
    nursesNotes: String,
    annotations: String,
    daysStayed: Number,
    prescriptions: String,
    patient: {type: mongoose.Types.ObjectId, ref: 'Patient'}
});

const PatientRecord = mongoose.model('PatientRecord', PatientRecordSchema);

module.exports = {PatientRecord};