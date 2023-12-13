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
    getPatientsByNurse
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

// Create a post
router.post('/', async (request, response) => {
    response.json(await createPatient(request.body.patientDetails));
});

// Update a specific post
router.put('/:patientID', async (request, response) => {
    let patientDetails = {
        patientID: request.params.patientID,
        updatedData: request.body.newPatientData
    };

    response.json(await updatePatient(patientDetails));
});

// Delete a specific post
router.delete('/:patientID', async (request, response) => {
    response.json(await deletePatient(request.params.patientID));
});


// Export the router so that other files can use it:
module.exports = router;