const express = require('express');
const router = express.Router();

const { User } = require('../models/UserModel');

const { validateHashedData, 
    generateUserJWT, verifyUserJWT, 
    getAllUsers, getSpecificUser, createUser, updateUser, deleteUser, getSpecificUserById,
    getAllDoctors, getAllNurses
} = require('./UserFunctions');

router.post('/register', async (request, response) => {
    let userDetails = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        employeeID: request.body.employeeID,
        email: request.body.email,
        password: request.body.password,
        phone: request.body.phone,
        profession: request.body.profession
    }
    let newUserDoc = await createUser(userDetails);

    response.json({
        user: newUserDoc
    });

});

router.post('/login', async (request, response) => {
    let targetUser = await User.findOne({employeeID: request.body.employeeID}).exec();

    if (await validateHashedData(request.body.password, targetUser.password)){
        let encryptedUserJwt = await generateUserJWT(
            {
                userID: targetUser.id,
                employeeID: targetUser.employeeID,
                password: targetUser.password
            }
        );

        response.json(encryptedUserJwt);

    } else {
        response.status(400).json({message:"Invalid user details provided."});
    }
});

router.post('/token-refresh', async(request, response) => {
    let oldToken = request.body.jwt;
    let refreshResult = await verifyUserJWT(oldToken).catch(error => {return {error: error.message}})
    response.json(refreshResult);
});

router.put('/:userID', async (request, response) => {
    let userDetails = request.body;
    let userID = request.params.userID;

    response.json(await updateUser(userID, userDetails));
});

router.delete('/:userID', async (request, response) => {
    response.json(await deleteUser(request.params.userID));
});

router.get('/', async (request, response) => {
    let allUsers = await getAllUsers();

    response.json({
        userCount: allUsers.length,
        usersArray: allUsers
    });
});

router.get('/doctors', async (request, response) => {
    response.json( await getAllDoctors());
});

router.get('/nurses', async (request, response) => {
    response.json( await getAllNurses());
});

router.get('/employees/:employeeID', async (request, response) => {
    response.json(await getSpecificUser(request.params.employeeID));
});

router.get('/:userID', async (request, response) => {
    response.json(await getSpecificUserById(request.params.userID));
});

module.exports = router;