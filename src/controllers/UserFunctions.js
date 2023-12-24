const { User } = require('../models/UserModel');

const dotenv = require('dotenv');
dotenv.config();

const crypto = require('crypto');
let encAlgorithm = 'aes-256-cbc';
let encPrivateKey = crypto.scryptSync(process.env.ENC_KEY, 'SpecialSalt', 32);
let encIV = crypto.scryptSync(process.env.ENC_IV, 'SpecialSalt', 16);
let cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV);
let decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV);

function encryptString(data){
    cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

function decryptString(data){
    decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV);
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
}

function decryptObject(data){
    return JSON.parse(decryptString(data));
}


const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashString(stringToHash){
    let saltToAdd = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(stringToHash, saltToAdd);
}

async function validateHashedData(providedUnhashedData, storedHashedData){
    return await bcrypt.compare(providedUnhashedData, storedHashedData);
}


const jwt = require('jsonwebtoken');

function generateJWT(payloadObj){
    return jwt.sign(payloadObj, process.env.JWT_SECRET, { expiresIn: "7d"});
}


async function generateUserJWT(userDetails){
    let encryptedUserData = encryptString(JSON.stringify(userDetails));
    return generateJWT({data: encryptedUserData});
}

async function verifyUserJWT(userJWT){
    let userJwtVerified = jwt.verify(userJWT,process.env.JWT_SECRET, {complete: true});
    // Decrypt the encrypted payload.
    let decryptedJwtPayload = decryptString(userJwtVerified.payload.data);
    // Parse the decrypted data into an object.
    let userData = JSON.parse(decryptedJwtPayload);
    // Find the user mentioned in the JWT.
    let targetUser = await User.findById(userData.userID).exec();
    // If the JWT data matches the stored data...
    if (targetUser.password == userData.password && targetUser.email == userData.email){
        // ...User details are valid, make a fresh JWT to extend their token's valid time
        return generateJWT({data: userJwtVerified.payload.data});
    } else {
        // Otherwise, user details are invalid and they don't get a new token.
        // When a frontend receives this error, it should redirect to a sign-in page.
        throw new Error({message: "Invalid user token."});
    }
}


async function getAllUsers(){
    return await User.find({});
}

async function getAllDoctors() {
    return await User.find({profession: "Doctor"})
}

async function getAllNurses() {
    return await User.find({profession: "Nurse"})
}

async function getSpecificUser(employeeID){
    return await User.findOne({employeeID: employeeID});
}
async function getSpecificUserById(userID){
    return await User.findById(userID);
}

async function createUser(userDetails){
    userDetails.hashedPassword = await hashString(userDetails.password);

    let newUser = new User(
        { 
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            employeeID: userDetails.employeeID,
            email: userDetails.email,
            password: userDetails.hashedPassword,
            phone: userDetails.phone,
            profession: userDetails.profession
        }
    )
    

    return await newUser.save();
}

async function updateUser(userID, userDetails){
    return await User.findByIdAndUpdate(userID, userDetails, {returnDocument: 'after'}).exec();

}

async function deleteUser(userID){
    return await User.findByIdAndDelete(userID).exec();
}


module.exports = {
    encryptString, decryptString, decryptObject, hashString, validateHashedData, 
    generateJWT, generateUserJWT, verifyUserJWT, 
    getAllUsers, getSpecificUser, createUser, updateUser, deleteUser, getSpecificUserById,
    getAllDoctors, getAllNurses
}