const {PatientRecord} = require('../models/PatientRecordModel');

// Model.find({}) returns all documents in a collection.
async function getAllPatientRecords(){
    return await PatientRecord.find({}).exec();
}

async function getPatientRecordById(patientrecordID){
    return await PatientRecord.findById(patientrecordID).exec();
}

async function getPatientRecordByPatient(patientID){
    return await PatientRecord.find({patient: patientID}).exec();
}

async function createPatientRecord(patientRecordDetails){
    return await PatientRecord.create(patientRecordDetails);
}

async function updatePatientRecord(patientRecordDetails){
    // Find user, update it, return the updated user data.
    return await PatientRecord.findByIdAndUpdate(patientRecordDetails.patientrecordID, patientRecordDetails.updatedData, {returnDocument: 'after'}).exec();
}

async function deletePatientRecord(patientrecordID){
    return await PatientRecord.findByIdAndDelete(patientrecordID).exec();

}

module.exports = {
    getAllPatientRecords, getPatientRecordById, getPatientRecordByPatient, createPatientRecord, updatePatientRecord, deletePatientRecord
}