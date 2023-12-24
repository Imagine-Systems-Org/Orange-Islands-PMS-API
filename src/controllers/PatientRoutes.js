const express = require('express');
const router = express.Router();


const {
    getAllPatients, 
    getPatientById, 
    getPatientByName,
    updatePatient, 
    deletePatient,
    getPatientsByDoctor,
    getPatientsByNurse,
    createPatientwithDoctorandNurse
} = require('./PatientFunctions');

router.get('/', async (request, response) => {
    response.json(await getAllPatients());
});

router.get('/assignedDoctor/:userID', async (request, response) => {
    response.json(await getPatientsByDoctor(request.params.userID));
});

router.get('/assignedNurse/:userID', async (request, response) => {
    response.json(await getPatientsByNurse(request.params.userID));
}); 

router.get('/:patientID', async (request, response) => {
    response.json(await getPatientById(request.params.patientID));
});

router.get('/:patientName', async (request, response) => {
    response.json(await getPatientByName(request.params.patientName));
});

// Create a post
router.post('/new/doctor/:assignedDoctor/nurse/:assignedNurse', 
async (request, response) => {
    let patientDetails = {
        name: request.body.name,
        species: request.body.species,
        category: request.body.category,
        dateOfBirth: request.body.dateOfBirth,
        allergies: request.body.allergies,
        assignedDoctor: request.params.assignedDoctor,
        assignedNurse: request.params.assignedNurse,
        bed: request.body.bed,
        trainerName: request.body.trainerName,
        trainerPhone: request.body.trainerPhone
    }
    let newPatientDoc = await createPatientwithDoctorandNurse(patientDetails);
    response.json({patient: newPatientDoc});
});

router.put('/:patientID', async (request, response) => {
    let patientDetails = request.body;
    let patientID = request.params.patientID;

    response.json(await updatePatient(patientID, patientDetails));
});

router.delete('/:patientID', async (request, response) => {
    response.json(await deletePatient(request.params.patientID));
});

module.exports = router;