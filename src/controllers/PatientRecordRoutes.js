const express = require('express');
const router = express.Router();


const {
    getAllPatientRecords, getPatientRecordById, getPatientRecordByPatient, createPatientRecord, updatePatientRecord, deletePatientRecord
} = require('./PatientRecordFunctions');

router.get('/', async (request, response) => {
    let allPatientRecords = await getAllPatientRecords();

    response.json({
        patientrecordsCount: allPatientRecords.length,
        patientrecordsArray: allPatientRecords
    });
});

router.get('/patient/:patientID', async (request, response) => {
    response.json(await getPatientRecordByPatient(request.params.patientID));
    });

router.get('/:patientrecordID', async (request, response) => {
    response.json(await getPatientRecordById(request.params.patientrecordID));
});

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

router.put('/:patientrecordID', async (request, response) => {
    let patientRecordDetails = request.body;
    let patientRecordID = request.params.patientrecordID;

    response.json(await updatePatientRecord(patientRecordID, patientRecordDetails));
});

router.delete('/:patientrecordID', async (request, response) => {
    response.json(await deletePatientRecord(request.params.patientrecordID));
});

module.exports = router;