const {Patient} = require('../models/PatientModel');

async function getAllPatients(){
    return await Patient.find({}).exec();
}

async function getPatientById(patientID){
    return await Patient.findById(patientID).exec();
}

async function getPatientByName(patientName){
    return await Patient.find({name: patientName}).exec();
}

async function getPatientsByDoctor(userID){
    return await Patient.find({assignedDoctor: userID}).exec();
}

async function getPatientsByNurse(userID){
    return await Patient.find({assignedNurse: userID}).exec();
}

async function createPatientwithDoctorandNurse(patientDetails){
    let newPatient = new Patient(
        {
            name: patientDetails.name,
            species: patientDetails.species,
            category: patientDetails.category,
            dateOfBirth: patientDetails.dateOfBirth,
            allergies: patientDetails.allergies,
            assignedDoctor: patientDetails.assignedDoctor,
            assignedNurse: patientDetails.assignedNurse,
            bed: patientDetails.bed,
            trainerName: patientDetails.trainerName,
            trainerPhone: patientDetails.trainerPhone
        }
    )
    return await newPatient.save();
}

async function updatePatient(patientID, patientDetails){
    return await Patient.findByIdAndUpdate(patientID, patientDetails, {returnDocument: 'after'}).exec();
}

async function deletePatient(patientID){
    return await Patient.findByIdAndDelete(patientID).exec();
}

module.exports = {
    getAllPatients, 
    getPatientById, 
    getPatientByName,
    createPatientwithDoctorandNurse, 
    updatePatient, 
    deletePatient, 
    getPatientsByDoctor, 
    getPatientsByNurse
}