// Import Express
const express = require('express');
// Create an instance of an Express Router
const router = express.Router();


const {
    getAllPatientRecords, getPatientRecordById, getPatientRecordByPatient, createPatientRecord, updatePatientRecord, deletePatientRecord
} = require('./PatientRecordFunctions');

// Show all posts
router.get('/', async (request, response) => {
    let allPatientRecords = await getAllPatientRecords();

    response.json({
        patientrecordsCount: allPatientRecords.length,
        patientrecordsArray: allPatientRecords
    });
});

// Show posts by specific user
router.get('/patient/:patientID', async (request, response) => {
    let patientrecordsByPatient = await getPatientRecordByPatient(request.params.patientID);

    response.json({
        patientrecordsCount: patientrecordsByPatient.length,
        patientsrecordsArray: patientrecordsByPatient
    });
});

// Show specific post by ID
router.get('/:patientrecordID', async (request, response) => {
    response.json(await getPatientRecordById(request.params.patientrecordID));
});

// Create a post
router.post('/', async (request, response) => {
    response.json(await createPatientRecord(request.body.patientRecordDetails));
});

// Update a specific post
router.put('/:patientrecordID', async (request, response) => {
    let patientRecordDetails = {
        patientrecordID: request.params.patientrecordID,
        updatedData: request.body.newPatientRecordData
    };

    response.json(await updatePatientRecord(patientRecordDetails));
});

// Delete a specific post
router.delete('/:patientrecordID', async (request, response) => {
    response.json(await deletePatientRecord(request.params.patientrecordID));
});


// Export the router so that other files can use it:
module.exports = router;