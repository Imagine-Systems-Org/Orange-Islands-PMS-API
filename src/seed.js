const mongoose = require('mongoose');
const { databaseConnector } = require('./database');

// Import the models that we'll seed, so that 
// we can do things like Role.insertMany()
const { User } = require('./models/UserModel');
const { Patient } = require('./models/PatientModel');
const { PatientRecord } = require('./models/PatientRecordModel');
const { hashString } = require('./controllers/UserFunctions');

// Make sure this file can read environment variables.
const dotenv = require('dotenv');
dotenv.config();

// Create some raw data for the Roles collection,
// obeying the needed fields from the Role schema.

// To fill in after creating user data encryption functionality.
const doctors = [
    {
        firstName: "Andrew",
        lastName: "Montgomery",
        employeeID: "ND514",
        email: "Andrew@SunClinic.net",
        password: "BasketCase",
        phone: "0461844532",
        profession: "Doctor"
    },
    {
        firstName: "Christine",
        lastName: "Wilder",
        employeeID: "ND398",
        email: "Christine@SunClinic.net",
        password: "WaterField",
        phone: "0431799842",
        profession: "Doctor"
    }
];

const nurses = [
    {
        firstName: "Lucile",
        lastName: "Bowers",
        employeeID: "XM514",
        email: "Lucile@SunClinic.net",
        password: "CrystalClear",
        phone: "042211458",
        profession: "Nurse"
    },
    {
        firstName: "Geoffrey",
        lastName: "Sanders",
        employeeID: "XM398",
        email: "Geoffrey@SunClinic.net",
        password: "BlackSword",
        phone: "043315489",
        profession: "Nurse"
    }
]

const pharmacists = [
    {
        firstName: "Alec",
        lastName: "Baldwin",
        employeeID: "AM453",
        email: "Alec@SunClinic.net",
        password: "DarkSword",
        phone: "042219843",
        profession: "Pharmacist"
    }
]

// To fill in after creating users successfully.
const patients = [
    {
    name: "Bubbles",
    species: "Gardevoir",
    category: "Empathy",
    dateOfBirth: "2005-12-11",
    bed: "12",
    trainerName: "William Bowers",
    trainerPhone: "026363631"
    },
    {
    name: "Wittaker",
    species: "Bulbasaur",
    category: "Seed",
    dateOfBirth: "2005-12-11",
    bed: "12",
    trainerName: "William Bowers",
    trainerPhone: "026363631"
    }
];

const patientrecords = [
    {
    treatment: "Rest",
    condition: "Good",
    nursesNotes: "Monitoring hydrations levels",
    annotations: "Acute dehydration",
    daysStayed: 3,
    prescriptions: "Intravenous Fluids",
    }
];


// Connect to the database.
var databaseURL = "";
switch (process.env.NODE_ENV.toLowerCase()) {
    case "test":
        databaseURL = "mongodb://localhost:27017/orangeislandspms-test";
        break;
    case "development":
        databaseURL = process.env.DATABASE_URL;
        break;
    case "production":
        databaseURL = process.env.DB_URI;
        break;
    default:
        console.error("Incorrect JS environment specified, database will not be connected.");
        break;
}


// This functionality is a big promise-then chain.
// This is because it requires some async functionality,
// and that doesn't work without being wrapped in a function.
// Since .then(callback) lets us create functions as callbacks,
// we can just do stuff in a nice .then chain.
databaseConnector(databaseURL).then(() => {
    console.log("Database connected successfully!");
}).catch(error => {
    console.log(`
    Some error occurred connecting to the database! It was: 
    ${error}
    `);
}).then(async () => {
    if (process.env.WIPE == "true"){
        // Get the names of all collections in the DB.
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Empty the data and collections from the DB so that they no longer exist.
        collections.map((collection) => collection.name)
        .forEach(async (collectionName) => {
            mongoose.connection.db.dropCollection(collectionName);
        });
        console.log("Old DB data deleted.");
    }
}).then(async () => {

    // Iterate through the users array, using for-of to enable async/await.
    for (const doctor of doctors) {
        // Set the password of the user.
        doctor.password = await hashString("password1");
    }
    for (const nurse of nurses) {
        // Set the password of the user.
        nurse.password = await hashString("password1");
    }
    for (const pharmacist of pharmacists) {
        // Set the password of the user.
        pharmacist.password = await hashString("password1");
    }
    // Save the users to the database.
    let doctorsCreated = await User.insertMany(doctors);
    let nursesCreated = await User.insertMany(nurses);
    let pharmacistsCreated = await User.insertMany(pharmacists);

    // Same again for posts;
    // pick a random user and assign that user as the author of a post.
    for (const patient of patients) {
        patient.assignedDoctor = doctorsCreated[Math.floor(Math.random() * doctorsCreated.length)].id;
        patient.assignedNurse = nursesCreated[Math.floor(Math.random() * nursesCreated.length)].id;
    }
    // Then save the posts to the database.
    let patientsCreated = await Patient.insertMany(patients);

    for (const record of patientrecords) {
        record.patient = patientsCreated[Math.floor(Math.random() * patientsCreated.length)].id;
    }

    let patientrecordsCreated = await PatientRecord.insertMany(patientrecords);
    // Log modified to list all data created.
    console.log("New DB data created.\n" + JSON.stringify({doctors: doctorsCreated, nurses: nursesCreated, pharmacists: pharmacistsCreated, patients: patientsCreated, patientrecords: patientrecordsCreated}, null, 4));
}).then(() => {
    // Disconnect from the database.
    mongoose.connection.close();
    console.log("DB seed connection closed.")
});