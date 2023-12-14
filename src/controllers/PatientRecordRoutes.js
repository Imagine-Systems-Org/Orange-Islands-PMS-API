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

// Create a patient record
router.post('/:patientID', async (request, response) => {
    let patientRecordDetails = {
        treatment: request.body.treatment,
        condition: request.body.condition,
        nursesNotes: request.body.nursesNotes,
        annotations: request.body.annotations,
        daysStayed: request.body.daysStayed,
        prescriptions: request.body.prescriptions,
        patient: request.params.patientID
    }
    let newPatientRecordDoc = await createPatientRecord(patientRecordDetails);

    response.json({
        patientrecord: newPatientRecordDoc
    });
});

// Update a specific post
router.put('/:patientrecordID', async (request, response) => {
    let patientRecordDetails = request.body;
    let patientRecordID = request.params.patientrecordID;

    response.json(await updatePatientRecord(patientRecordID, patientRecordDetails));
});

// Delete a specific post
router.delete('/:patientrecordID', async (request, response) => {
    response.json(await deletePatientRecord(request.params.patientrecordID));
});


// Export the router so that other files can use it:
module.exports = router;