const {Patient} = require('../models/PatientModel');

// Model.find({}) returns all documents in a collection.
async function getAllPatients(){
    return await Patient.find({}).exec();
}

async function getPatientById(patientID){
    return await Patient.findById(patientID).exec();
}

async function getPatientsByDoctor(userID){
    return await Patient.find({assignedDoctor: userID}).exec();
}

async function getPatientsByNurse(userID){
    return await Patient.find({assignedNurse: userID}).exec();
}

async function createPatient(patientDetails){
    let newPatient = new Patient(
        {
            name: patientDetails.name,
            species: patientDetails.species,
            category: patientDetails.category,
            dateOfBirth: patientDetails.dateOfBirth,
            assignedDoctor: patientDetails.assignedDoctor,
            assignedNurse: patientDetails.assignedNurse,
            bed: patientDetails.bed,
            trainer: patientDetails.trainer
        }
    )
    return await newPatient.save();
}

async function updatePatient(patientID, patientDetails){
    // Find user, update it, return the updated user data.
    return await Patient.findByIdAndUpdate(patientID, patientDetails, {returnDocument: 'after'}).exec();
}

async function deletePatient(patientID){
    return await Patient.findByIdAndDelete(patientID).exec();
}

module.exports = {
    getAllPatients, getPatientById, createPatient, updatePatient, deletePatient, getPatientsByDoctor, getPatientsByNurse
}