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
  "name": "Buddy",
  "species": "Electivire",
  "category": "Electric",
  "dateOfBirth": "2009-12-28",
  "allergies": "Peanuts",
  "bed": 2,
  "trainerName": "Freda Rouse",
  "trainerPhone": "4018193342"
}, {
  "name": "Max",
  "species": "Gyarados",
  "category": "Water/Flying",
  "dateOfBirth": "2011-04-26",
  "allergies": "Shellfish",
  "bed": 8,
  "trainerName": "Theo Kennefick",
  "trainerPhone": "5014706787"
}, {
  "name": "Charlie",
  "species": "Espeon",
  "category": "Psychic",
  "dateOfBirth": "2007-01-12",
  "allergies": "Eggs",
  "bed": 6,
  "trainerName": "Micki Tolchar",
  "trainerPhone": "6132982785"
}, {
  "name": "Lucy",
  "species": "Scizor",
  "category": "Bug/Steel",
  "dateOfBirth": "2008-07-03",
  "allergies": "Dairy",
  "bed": 14,
  "trainerName": "Janean Olivari",
  "trainerPhone": "5074395413"
}, {
  "name": "Daisy",
  "species": "Ampharos",
  "category": "Electric",
  "dateOfBirth": "2008-06-26",
  "allergies": "Tree Nuts",
  "bed": 9,
  "trainerName": "Melodee Jodkowski",
  "trainerPhone": "8615657590"
}, {
  "name": "Rocky",
  "species": "Houndoom",
  "category": "Dark/Fire",
  "dateOfBirth": "2007-08-03",
  "allergies": "Soy",
  "bed": 9,
  "trainerName": "Farlie Varnals",
  "trainerPhone": "9824892997"
}, {
  "name": "Bailey",
  "species": "Alakazam",
  "category": "Psychic",
  "dateOfBirth": "2011-11-28",
  "allergies": "Wheat",
  "bed": 10,
  "trainerName": "Jennifer De Beauchemp",
  "trainerPhone": "9247319752"
}, {
  "name": "Molly",
  "species": "Tyranitar",
  "category": "Rock/Dark",
  "dateOfBirth": "2007-02-10",
  "allergies": "Fish",
  "bed": 1,
  "trainerName": "Tybi Feldstern",
  "trainerPhone": "9234210338"
}, {
  "name": "Sadie",
  "species": "Blaziken",
  "category": "Fire/Fighting",
  "dateOfBirth": "2007-06-16",
  "allergies": "Sesame",
  "bed": 6,
  "trainerName": "Isobel Sweeting",
  "trainerPhone": "6285727603"
}, {
  "name": "Lola",
  "species": "Milotic",
  "category": "Water",
  "dateOfBirth": "2008-07-15",
  "allergies": "Mustard",
  "bed": 6,
  "trainerName": "Cathleen Eouzan",
  "trainerPhone": "8427178713"
}, {
  "name": "Buddy",
  "species": "Metagross",
  "category": "Steel/Psychic",
  "dateOfBirth": "2011-02-27",
  "allergies": "Corn",
  "bed": 5,
  "trainerName": "Riccardo Gillet",
  "trainerPhone": "4638390299"
}, {
  "name": "Max",
  "species": "Gardevoir",
  "category": "Psychic/Fairy",
  "dateOfBirth": "2008-04-23",
  "allergies": "Latex",
  "bed": 4,
  "trainerName": "Ignacio Colliar",
  "trainerPhone": "7842845456"
}, {
  "name": "Charlie",
  "species": "Lucario",
  "category": "Fighting/Steel",
  "dateOfBirth": "2008-02-18",
  "allergies": "Strawberries",
  "bed": 9,
  "trainerName": "Lorianna Kilday",
  "trainerPhone": "6964696131"
}, {
  "name": "Lucy",
  "species": "Salamence",
  "category": "Dragon/Flying",
  "dateOfBirth": "2011-11-04",
  "allergies": "Pineapple",
  "bed": 7,
  "trainerName": "Grazia Vango",
  "trainerPhone": "8642020497"
}, {
  "name": "Daisy",
  "species": "Froslass",
  "category": "Ice/Ghost.",
  "dateOfBirth": "2009-10-22",
  "allergies": "Mango",
  "bed": 6,
  "trainerName": "Yvor Guyonneau",
  "trainerPhone": "7792470687"
}]

  

const patientrecords = [{
    "treatment": "therapy",
    "condition": "Good",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "F/U",
    "daysStayed": 35,
    "prescriptions": "Amoxicillin"
  }, {
    "treatment": "radiation",
    "condition": "Critical",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "PE",
    "daysStayed": 35,
    "prescriptions": "Lisinopril"
  }, {
    "treatment": "therapy",
    "condition": "Serious",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "PE",
    "daysStayed": 198,
    "prescriptions": "Lisinopril"
  }, {
    "treatment": "radiation",
    "condition": "Fair",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "VS",
    "daysStayed": 136,
    "prescriptions": "Atorvastatin"
  }, {
    "treatment": "physical therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "SH",
    "daysStayed": 187,
    "prescriptions": "Warfarin"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "Dx",
    "daysStayed": 55,
    "prescriptions": "Metformin"
  }, {
    "treatment": "surgery",
    "condition": "Good",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "HPI",
    "daysStayed": 63,
    "prescriptions": "Loratadine"
  }, {
    "treatment": "radiation",
    "condition": "Fair",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "PE",
    "daysStayed": 40,
    "prescriptions": "Lisinopril"
  }, {
    "treatment": "medication",
    "condition": "Good",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "DDx",
    "daysStayed": 172,
    "prescriptions": "Amoxicillin"
  }, {
    "treatment": "therapy",
    "condition": "Critical",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "ROS",
    "daysStayed": 155,
    "prescriptions": "Ibuprofen"
  }, {
    "treatment": "therapy",
    "condition": "Good",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "VS",
    "daysStayed": 49,
    "prescriptions": "Warfarin"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "DDx",
    "daysStayed": 198,
    "prescriptions": "Omeprazole"
  }, {
    "treatment": "physical therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "Tx",
    "daysStayed": 65,
    "prescriptions": "Lisinopril"
  }, {
    "treatment": "radiation",
    "condition": "Fair",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "SH",
    "daysStayed": 99,
    "prescriptions": "Albuterol inhaler"
  }, {
    "treatment": "medication",
    "condition": "Good",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "HPI",
    "daysStayed": 141,
    "prescriptions": "Insulin glargine"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "HPI",
    "daysStayed": 91,
    "prescriptions": "Albuterol inhaler"
  }, {
    "treatment": "medication",
    "condition": "Undetermined",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "Rx",
    "daysStayed": 14,
    "prescriptions": "Insulin glargine"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "POC",
    "daysStayed": 179,
    "prescriptions": "Lisinopril"
  }, {
    "treatment": "physical therapy",
    "condition": "Fair",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "LMP",
    "daysStayed": 150,
    "prescriptions": "Amoxicillin"
  }, {
    "treatment": "radiation",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "Tx",
    "daysStayed": 178,
    "prescriptions": "Ciprofloxacin"
  }, {
    "treatment": "radiation",
    "condition": "Fair",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "HPI",
    "daysStayed": 184,
    "prescriptions": "Amoxicillin"
  }, {
    "treatment": "medication",
    "condition": "Good",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "LMP",
    "daysStayed": 60,
    "prescriptions": "HCTZ (Hydrochlorothiazide)"
  }, {
    "treatment": "therapy",
    "condition": "Fair",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "DDx",
    "daysStayed": 6,
    "prescriptions": "HCTZ (Hydrochlorothiazide)"
  }, {
    "treatment": "radiation",
    "condition": "Good",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "PMH",
    "daysStayed": 92,
    "prescriptions": "Metformin"
  }, {
    "treatment": "surgery",
    "condition": "Fair",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "DDx",
    "daysStayed": 161,
    "prescriptions": "Sertraline"
  }, {
    "treatment": "therapy",
    "condition": "Serious",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "ROS",
    "daysStayed": 74,
    "prescriptions": "Ibuprofen"
  }, {
    "treatment": "radiation",
    "condition": "Good",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "SH",
    "daysStayed": 124,
    "prescriptions": "Prednisone"
  }, {
    "treatment": "medication",
    "condition": "Undetermined",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "ROS",
    "daysStayed": 160,
    "prescriptions": "Sertraline"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "HPI",
    "daysStayed": 172,
    "prescriptions": "Prednisone"
  }, {
    "treatment": "surgery",
    "condition": "Critical",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "DDx",
    "daysStayed": 162,
    "prescriptions": "Atorvastatin"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "HPI",
    "daysStayed": 178,
    "prescriptions": "Warfarin"
  }, {
    "treatment": "medication",
    "condition": "Undetermined",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "HPI",
    "daysStayed": 138,
    "prescriptions": "Acetaminophen"
  }, {
    "treatment": "therapy",
    "condition": "Fair",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "PE",
    "daysStayed": 98,
    "prescriptions": "HCTZ (Hydrochlorothiazide)"
  }, {
    "treatment": "surgery",
    "condition": "Fair",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "CC",
    "daysStayed": 60,
    "prescriptions": "Loratadine"
  }, {
    "treatment": "therapy",
    "condition": "Serious",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "CC",
    "daysStayed": 181,
    "prescriptions": "Prednisone"
  }, {
    "treatment": "therapy",
    "condition": "Critical",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "F/U",
    "daysStayed": 7,
    "prescriptions": "Insulin glargine"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "F/U",
    "daysStayed": 200,
    "prescriptions": "Loratadine"
  }, {
    "treatment": "medication",
    "condition": "Critical",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "ROS",
    "daysStayed": 198,
    "prescriptions": "Atorvastatin"
  }, {
    "treatment": "medication",
    "condition": "Critical",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "POC",
    "daysStayed": 35,
    "prescriptions": "Prednisone"
  }, {
    "treatment": "medication",
    "condition": "Undetermined",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "CC",
    "daysStayed": 84,
    "prescriptions": "Prednisone"
  }, {
    "treatment": "surgery",
    "condition": "Good",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "SH",
    "daysStayed": 105,
    "prescriptions": "Atorvastatin"
  }, {
    "treatment": "medication",
    "condition": "Serious",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "FH",
    "daysStayed": 157,
    "prescriptions": "Acetaminophen"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient is experiencing pain in the abdomen.",
    "annotations": "LMP",
    "daysStayed": 119,
    "prescriptions": "Acetaminophen"
  }, {
    "treatment": "therapy",
    "condition": "Undetermined",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "SH",
    "daysStayed": 115,
    "prescriptions": "Amoxicillin"
  }, {
    "treatment": "radiation",
    "condition": "Serious",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "PMH",
    "daysStayed": 101,
    "prescriptions": "Ibuprofen"
  }, {
    "treatment": "therapy",
    "condition": "Critical",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "LMP",
    "daysStayed": 139,
    "prescriptions": "Omeprazole"
  }, {
    "treatment": "physical therapy",
    "condition": "Good",
    "nursesNotes": "Patient reports feeling fatigued.",
    "annotations": "POC",
    "daysStayed": 70,
    "prescriptions": "HCTZ (Hydrochlorothiazide)"
  }, {
    "treatment": "surgery",
    "condition": "Serious",
    "nursesNotes": "Patient's vital signs are stable.",
    "annotations": "FH",
    "daysStayed": 90,
    "prescriptions": "Lisinopril"
  }, {
    "treatment": "therapy",
    "condition": "Good",
    "nursesNotes": "Patient complains of mild headache.",
    "annotations": "FH",
    "daysStayed": 61,
    "prescriptions": "Ibuprofen"
  }, {
    "treatment": "medication",
    "condition": "Good",
    "nursesNotes": "Patient appears to be in good health.",
    "annotations": "Dx",
    "daysStayed": 10,
    "prescriptions": "Lisinopril"
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