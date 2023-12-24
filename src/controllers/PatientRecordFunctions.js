const {PatientRecord} = require('../models/PatientRecordModel');

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

    let newPatientRecord = new PatientRecord(
        {
            treatment: patientRecordDetails.treatment,
            condition: patientRecordDetails.condition,
            nursesNotes: patientRecordDetails.nursesNotes,
            annotations: patientRecordDetails.annotations,
            daysStayed: patientRecordDetails.daysStayed,
            prescriptions: patientRecordDetails.prescriptions,
            patient: patientRecordDetails.patient
        }
    )

    return await newPatientRecord.save();
}

async function updatePatientRecord(patientRecordID, patientRecordDetails){
    return await PatientRecord.findByIdAndUpdate(patientRecordID, patientRecordDetails, {returnDocument: 'after'}).exec();
}

async function deletePatientRecord(patientrecordID){
    return await PatientRecord.findByIdAndDelete(patientrecordID).exec();

}

module.exports = {
    getAllPatientRecords, getPatientRecordById, getPatientRecordByPatient, createPatientRecord, updatePatientRecord, deletePatientRecord
}