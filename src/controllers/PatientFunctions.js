const {Patient} = require('../models/PatientModel');

// Model.find({}) returns all documents in a collection.
async function getAllPatients(){
    return await Patient.find({}).exec();
}

async function getPatientById(patientID){
    return await Patient.findById(patientID).exec();
}

// UNNECESSARY
// async function getPatientsByTrainer(userID){
//     return await Post.find({author: userID}).exec();
// }

async function createPatient(patientDetails){
    return await Patient.create(patientDetails);
}

async function updatePatient(patientDetails){
    // Find user, update it, return the updated user data.
    return await Patient.findByIdAndUpdate(patientDetails.patientID, patientDetails.updatedData, {returnDocument: 'after'}).exec();

}

async function deletePatient(patientID){
    return await Patient.findByIdAndDelete(patientID).exec();

}

module.exports = {
    getAllPatients, getPatientById, createPatient, updatePatient, deletePatient
}