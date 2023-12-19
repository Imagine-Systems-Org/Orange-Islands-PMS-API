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

const doctors = [{
    "firstName": "Haven",
    "lastName": "Redgewell",
    "employeeID": "QF850",
    "email": "nEASqe@SunClinic.net",
    "phone": "2795783380",
    "profession": "Doctor"
  }, {
    "firstName": "Francesca",
    "lastName": "Emmett",
    "employeeID": "HK286",
    "email": "XglHKHdP@SunClinic.net",
    "phone": "5173989965",
    "profession": "Doctor"
  }, {
    "firstName": "Elsey",
    "lastName": "Bache",
    "employeeID": "HH264",
    "email": "HMHao@SunClinic.net",
    "phone": "8428657957",
    "profession": "Doctor"
  }, {
    "firstName": "Allis",
    "lastName": "Esbrook",
    "employeeID": "WG784",
    "email": "DpyPrY@SunClinic.net",
    "phone": "1248121127",
    "profession": "Doctor"
  }, {
    "firstName": "Sofie",
    "lastName": "Conville",
    "employeeID": "WQ846",
    "email": "QJLizS@SunClinic.net",
    "phone": "7637462239",
    "profession": "Doctor"
  }]

const nurses = [{
    "firstName": "Carroll",
    "lastName": "Riehm",
    "employeeID": "CN283",
    "email": "lXQCj@SunClinic.net",
    "phone": "2093198007",
    "profession": "Nurse"
  }, {
    "firstName": "Maible",
    "lastName": "Maffetti",
    "employeeID": "SG364",
    "email": "lEwQxcmT@SunClinic.net",
    "phone": "3035084584",
    "profession": "Nurse"
  }, {
    "firstName": "Neil",
    "lastName": "Arno",
    "employeeID": "HB398",
    "email": "SHHCpj@SunClinic.net",
    "phone": "3466099067",
    "profession": "Nurse"
  }, {
    "firstName": "Arlie",
    "lastName": "Clendennen",
    "employeeID": "ZT665",
    "email": "kfAdIksi@SunClinic.net",
    "phone": "2901139086",
    "profession": "Nurse"
  }, {
    "firstName": "Heddie",
    "lastName": "Maisey",
    "employeeID": "LJ352",
    "email": "NhlKli@SunClinic.net",
    "phone": "1399605082",
    "profession": "Nurse"
  }]

const pharmacists = [{
    "firstName": "Reube",
    "lastName": "Sloat",
    "employeeID": "AJ659",
    "email": "NNqRfA@SunClinic.net",
    "phone": "3227224129",
    "profession": "Pharmacist"
  }, {
    "firstName": "Vannie",
    "lastName": "Juzek",
    "employeeID": "RJ273",
    "email": "bmFCAXeW@SunClinic.net",
    "phone": "5044576820",
    "profession": "Pharmacist"
  }, {
    "firstName": "Chic",
    "lastName": "Macallam",
    "employeeID": "FG142",
    "email": "glYCT@SunClinic.net",
    "phone": "2611790955",
    "profession": "Pharmacist"
  }]

// To fill in after creating users successfully.
const patients = [{
    "name": "Rocky",
    "species": "Gyarados",
    "category": "Dragon",
    "dateOfBirth": "1971-09-19",
    "bed": 12,
    "trainerName": "Iorgo Wallwood",
    "trainerPhone": "7431435746"
  }, {
    "name": "Oscar",
    "species": "Mew",
    "category": "Ghost",
    "dateOfBirth": "1956-06-03",
    "bed": 10,
    "trainerName": "Helsa Bellini",
    "trainerPhone": "4196237382"
  }, {
    "name": "Sparky",
    "species": "Machamp",
    "category": "Poison",
    "dateOfBirth": "1950-05-20",
    "bed": 6,
    "trainerName": "Kelcy Crothers",
    "trainerPhone": "4956650417"
  }, {
    "name": "Oscar",
    "species": "Arcanine",
    "category": "Poison",
    "dateOfBirth": "1997-01-05",
    "bed": 3,
    "trainerName": "Chaddie Yacob",
    "trainerPhone": "7202835747"
  }, {
    "name": "Oscar",
    "species": "Jolteon",
    "category": "Ice",
    "dateOfBirth": "1997-08-18",
    "bed": 2,
    "trainerName": "Pate Gyse",
    "trainerPhone": "6018159858"
  }, {
    "name": "Rocky",
    "species": "Gyarados",
    "category": "Ice",
    "dateOfBirth": "2000-08-23",
    "bed": 15,
    "trainerName": "Olly Wahlberg",
    "trainerPhone": "2916946897"
  }, {
    "name": "Coco",
    "species": "Mewtwo",
    "category": "Flying",
    "dateOfBirth": "1997-04-27",
    "bed": 8,
    "trainerName": "Cathy McMarquis",
    "trainerPhone": "8403161011"
  }, {
    "name": "Milo",
    "species": "Flareon",
    "category": "Grass",
    "dateOfBirth": "1986-12-31",
    "bed": 5,
    "trainerName": "Ulrick Kerne",
    "trainerPhone": "9621869748"
  }, {
    "name": "Charlie",
    "species": "Charizard",
    "category": "Electric",
    "dateOfBirth": "1956-06-08",
    "bed": 12,
    "trainerName": "Abigael Denecamp",
    "trainerPhone": "8859779326"
  }, {
    "name": "Max",
    "species": "Alakazam",
    "category": "Ghost",
    "dateOfBirth": "2002-06-13",
    "bed": 6,
    "trainerName": "Marietta Eakens",
    "trainerPhone": "9804416335"
  }, {
    "name": "Coco",
    "species": "Mew",
    "category": "Bug",
    "dateOfBirth": "1984-03-13",
    "bed": 4,
    "trainerName": "Samantha Caught",
    "trainerPhone": "4169539341"
  }, {
    "name": "Coco",
    "species": "Charizard",
    "category": "Poison",
    "dateOfBirth": "1952-11-12",
    "bed": 15,
    "trainerName": "Merilyn Kindon",
    "trainerPhone": "2375958037"
  }, {
    "name": "Coco",
    "species": "Jolteon",
    "category": "Grass",
    "dateOfBirth": "1997-01-30",
    "bed": 8,
    "trainerName": "Goraud Wherton",
    "trainerPhone": "2301380291"
  }, {
    "name": "Sunny",
    "species": "Machamp",
    "category": "Ice",
    "dateOfBirth": "1955-04-16",
    "bed": 8,
    "trainerName": "Bethena Yakebovich",
    "trainerPhone": "8545474347"
  }, {
    "name": "Sparky",
    "species": "Lapras",
    "category": "Fire",
    "dateOfBirth": "1957-10-04",
    "bed": 1,
    "trainerName": "Justin Troy",
    "trainerPhone": "7889620315"
  }, {
    "_id": "657a56b90b66096d5a6ca134",
    "name": "Bubbles",
    "species": "Empathy",
    "category": "Gardevoir",
    "dateOfBirth": "2005-12-11T00:00:00.000Z",
    "bed": "12",
    "trainerName": "William Bowers",
    "trainerPhone": "026363631"
  }, {
    "_id": "657a56c6fe22b20132604808",
    "name": "Kringo",
    "species": "Clefairy",
    "category": "Fairy",
    "dateOfBirth": "1992-03-29T00:00:00.000Z",
    "bed": "5",
    "trainerName": "Billy McNab",
    "trainerPhone": "0238945678"
  }]
  

const patientrecords = [{
    "treatment": "therapy",
    "condition": "Good",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "F/U",
    "daysStayed": 35,
    "precriptions": "Amoxicillin"
  }, {
    "treatment": "radiation",
    "condition": "Critical",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "PE",
    "daysStayed": 35,
    "precriptions": "Lisinopril"
  }, {
    "treatment": "therapy",
    "condition": "Serious",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "PE",
    "daysStayed": 198,
    "precriptions": "Lisinopril"
  }, {
    "treatment": "radiation",
    "condition": "Fair",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "VS",
    "daysStayed": 136,
    "precriptions": "Atorvastatin"
  }, {
    "treatment": "physical therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "SH",
    "daysStayed": 187,
    "precriptions": "Warfarin"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "Dx",
    "daysStayed": 55,
    "precriptions": "Metformin"
  }, {
    "treatment": "surgery",
    "condition": "Good",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "HPI",
    "daysStayed": 63,
    "precriptions": "Loratadine"
  }, {
    "treatment": "radiation",
    "condition": "Fair",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "PE",
    "daysStayed": 40,
    "precriptions": "Lisinopril"
  }, {
    "treatment": "medication",
    "condition": "Good",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "DDx",
    "daysStayed": 172,
    "precriptions": "Amoxicillin"
  }, {
    "treatment": "therapy",
    "condition": "Critical",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "ROS",
    "daysStayed": 155,
    "precriptions": "Ibuprofen"
  }, {
    "treatment": "therapy",
    "condition": "Good",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "VS",
    "daysStayed": 49,
    "precriptions": "Warfarin"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "DDx",
    "daysStayed": 198,
    "precriptions": "Omeprazole"
  }, {
    "treatment": "physical therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "Tx",
    "daysStayed": 65,
    "precriptions": "Lisinopril"
  }, {
    "treatment": "radiation",
    "condition": "Fair",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "SH",
    "daysStayed": 99,
    "precriptions": "Albuterol inhaler"
  }, {
    "treatment": "medication",
    "condition": "Good",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "HPI",
    "daysStayed": 141,
    "precriptions": "Insulin glargine"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "HPI",
    "daysStayed": 91,
    "precriptions": "Albuterol inhaler"
  }, {
    "treatment": "medication",
    "condition": "Undetermined",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "Rx",
    "daysStayed": 14,
    "precriptions": "Insulin glargine"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "POC",
    "daysStayed": 179,
    "precriptions": "Lisinopril"
  }, {
    "treatment": "physical therapy",
    "condition": "Fair",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "LMP",
    "daysStayed": 150,
    "precriptions": "Amoxicillin"
  }, {
    "treatment": "radiation",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "Tx",
    "daysStayed": 178,
    "precriptions": "Ciprofloxacin"
  }, {
    "treatment": "radiation",
    "condition": "Fair",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "HPI",
    "daysStayed": 184,
    "precriptions": "Amoxicillin"
  }, {
    "treatment": "medication",
    "condition": "Good",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "LMP",
    "daysStayed": 60,
    "precriptions": "HCTZ (Hydrochlorothiazide)"
  }, {
    "treatment": "therapy",
    "condition": "Fair",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "DDx",
    "daysStayed": 6,
    "precriptions": "HCTZ (Hydrochlorothiazide)"
  }, {
    "treatment": "radiation",
    "condition": "Good",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "PMH",
    "daysStayed": 92,
    "precriptions": "Metformin"
  }, {
    "treatment": "surgery",
    "condition": "Fair",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "DDx",
    "daysStayed": 161,
    "precriptions": "Sertraline"
  }, {
    "treatment": "therapy",
    "condition": "Serious",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "ROS",
    "daysStayed": 74,
    "precriptions": "Ibuprofen"
  }, {
    "treatment": "radiation",
    "condition": "Good",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "SH",
    "daysStayed": 124,
    "precriptions": "Prednisone"
  }, {
    "treatment": "medication",
    "condition": "Undetermined",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "ROS",
    "daysStayed": 160,
    "precriptions": "Sertraline"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "HPI",
    "daysStayed": 172,
    "precriptions": "Prednisone"
  }, {
    "treatment": "surgery",
    "condition": "Critical",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "DDx",
    "daysStayed": 162,
    "precriptions": "Atorvastatin"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "HPI",
    "daysStayed": 178,
    "precriptions": "Warfarin"
  }, {
    "treatment": "medication",
    "condition": "Undetermined",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "HPI",
    "daysStayed": 138,
    "precriptions": "Acetaminophen"
  }, {
    "treatment": "therapy",
    "condition": "Fair",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "PE",
    "daysStayed": 98,
    "precriptions": "HCTZ (Hydrochlorothiazide)"
  }, {
    "treatment": "surgery",
    "condition": "Fair",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "CC",
    "daysStayed": 60,
    "precriptions": "Loratadine"
  }, {
    "treatment": "therapy",
    "condition": "Serious",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "CC",
    "daysStayed": 181,
    "precriptions": "Prednisone"
  }, {
    "treatment": "therapy",
    "condition": "Critical",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "F/U",
    "daysStayed": 7,
    "precriptions": "Insulin glargine"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "F/U",
    "daysStayed": 200,
    "precriptions": "Loratadine"
  }, {
    "treatment": "medication",
    "condition": "Critical",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "ROS",
    "daysStayed": 198,
    "precriptions": "Atorvastatin"
  }, {
    "treatment": "medication",
    "condition": "Critical",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "POC",
    "daysStayed": 35,
    "precriptions": "Prednisone"
  }, {
    "treatment": "medication",
    "condition": "Undetermined",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "CC",
    "daysStayed": 84,
    "precriptions": "Prednisone"
  }, {
    "treatment": "surgery",
    "condition": "Good",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "SH",
    "daysStayed": 105,
    "precriptions": "Atorvastatin"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "FH",
    "daysStayed": 157,
    "precriptions": "Acetaminophen"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "LMP",
    "daysStayed": 119,
    "precriptions": "Acetaminophen"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "SH",
    "daysStayed": 115,
    "precriptions": "Amoxicillin"
  }, {
    "treatment": "radiation",
    "condition": "Serious",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "PMH",
    "daysStayed": 101,
    "precriptions": "Ibuprofen"
  }, {
    "treatment": "therapy",
    "condition": "Critical",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "LMP",
    "daysStayed": 139,
    "precriptions": "Omeprazole"
  }, {
    "treatment": "physical therapy",
    "condition": "Good",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "POC",
    "daysStayed": 70,
    "precriptions": "HCTZ (Hydrochlorothiazide)"
  }, {
    "treatment": "surgery",
    "condition": "Serious",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "FH",
    "daysStayed": 90,
    "precriptions": "Lisinopril"
  }, {
    "treatment": "therapy",
    "condition": "Good",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "FH",
    "daysStayed": 61,
    "precriptions": "Ibuprofen"
  }, {
    "treatment": "medication",
    "condition": "Good",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "Dx",
    "daysStayed": 10,
    "precriptions": "Lisinopril"
  }]


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