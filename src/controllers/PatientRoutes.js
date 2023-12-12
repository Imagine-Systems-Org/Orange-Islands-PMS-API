// Import Express
const express = require('express');
// Create an instance of an Express Router
const router = express.Router();


const {
    getAllPatients, getPatientById, createPatient, updatePatient, deletePatient
} = require('./PatientFunctions');

// Show all posts
router.get('/', async (request, response) => {
    let allPatients = await getAllPatients();

    response.json({
        patientsCount: allPatients.length,
        patientsArray: allPatients
    });
});

// // Show posts by specific user
// router.get('/author/:authorID', async (request, response) => {
//     let postsByAuthor = await getPostsByAuthor(request.params.authorID);

//     response.json({
//         postsCount: postsByAuthor.length,
//         postsArray: postsByAuthor
//     });
// });

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