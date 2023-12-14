// Import Express
const express = require('express');
// Create an instance of an Express Router
const router = express.Router();


const {
    getAllPatients, 
    getPatientById, 
    createPatient, 
    updatePatient, 
    deletePatient,
    getPatientsByDoctor,
    getPatientsByNurse,
    createPatientwithDoctorandNurse
} = require('./PatientFunctions');

// Show all posts
router.get('/', async (request, response) => {
    let allPatients = await getAllPatients();

    response.json({
        patientsCount: allPatients.length,
        patientsArray: allPatients
    });
});

// Show posts by specific user
router.get('/assignedDoctor/:userID', async (request, response) => {
    let patientsByDoctor = await getPatientsByDoctor(request.params.userID);

    response.json({
        patientsCount: patientsByDoctor.length,
        patientsArray: patientsByDoctor
    });
});

router.get('/assignedNurse/:userID', async (request, response) => {
    let patientsByNurse = await getPatientsByNurse(request.params.userID);

    response.json({
        patientsCount: patientsByNurse.length,
        patientsArray: patientsByNurse
    });
}); 

// Show specific post by ID
router.get('/:patientID', async (request, response) => {
    response.json(await getPatientById(request.params.patientID));
});

router.post('/new', async (request, response) => {
    let patientDetails = {
        name: request.body.name,
        species: request.body.species,
        category: request.body.category,
        dateOfBirth: request.body.dateOfBirth,
        bed: request.body.bed,
        trainer: request.body.trainer
    }
    let newPatientDoc = await createPatient(patientDetails);
    response.json({patient: newPatientDoc});
});

// Create a post
router.post('/new/doctor/:assignedDoctor/nurse/:assignedNurse', 
async (request, response) => {
    let patientDetails = {
        name: request.body.name,
        species: request.body.species,
        category: request.body.category,
        dateOfBirth: request.body.dateOfBirth,
        assignedDoctor: request.params.assignedDoctor,
        assignedNurse: request.params.assignedNurse,
        bed: request.body.bed,
        trainer: request.body.trainer
    }
    let newPatientDoc = await createPatientwithDoctorandNurse(patientDetails);
    response.json({patient: newPatientDoc});
});

// Update a specific post
router.put('/:patientID', async (request, response) => {
    let patientDetails = request.body;
    let patientID = request.params.patientID;

    response.json(await updatePatient(patientID, patientDetails));
});

// Delete a specific post
router.delete('/:patientID', async (request, response) => {
    response.json(await deletePatient(request.params.patientID));
});


// Export the router so that other files can use it:
module.exports = router;