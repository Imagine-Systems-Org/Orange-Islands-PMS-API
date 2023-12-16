// Make the .env data ready for use.
const dotenv = require('dotenv');
dotenv.config();

// Import the Express package and configure some needed data.
const express = require('express');
const app = express();
// If no process.env.X is found, assign a default value instead.
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// Configure some basic Helmet settings on the server instance.
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"]
    }
}));

// Configure some basic CORS settings on the server instance.
// These origin values don't actually have to be anything - 
// this project exists without a front-end, but any front-end
// that should interact with this API should be listed in the 
// array of origins for CORS configuration.
const cors = require('cors');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })
app.use(cors({ origin: ["http://127.0.0.1:5173", "http://localhost:5173", "https://deployedApp.com"], credentials: true }));

// Configure some API-friendly request data formatting.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');
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
const {databaseConnector} = require('./database');
databaseConnector(databaseURL).then(() => {
    console.log("Database connected successfully!");
}).catch(error => {
    console.log(`
    Some error occurred connecting to the database! It was: 
    ${error}
    `);
});

// Return a bunch of useful details from the database connection
// Dig into each property here:
// https://mongoosejs.com/docs/api/connection.html
app.get("/databaseHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
});

app.get("/databaseDump", async (request, response) => {
    // Set up an object to store our data.
    const dumpContainer = {};

    // Get the names of all collections in the DB.
    var collections = await mongoose.connection.db.listCollections().toArray();
    collections = collections.map((collection) => collection.name);

    // For each collection, get all their data and add it to the dumpContainer.
    for (const collectionName of collections) {
        let collectionData = await mongoose.connection.db.collection(collectionName).find({}).toArray();
        dumpContainer[collectionName] = collectionData;
    }

    // Confirm in the terminal that the server is returning the right data.
    // With pretty formatting too, via JSON.stringify(value, null, spacing for indentation).
    console.log("Dumping all of this data to the client: \n" + JSON.stringify(dumpContainer, null, 4));

    // Return the big data object.
    response.json({
        data: dumpContainer
    });
});

// Add a route just to make sure things work.
// This path is the server API's "homepage".
app.get('/', (request, response) => {
    response.json({
        message:"Hello world!"
    });
});

const usersController = require("./controllers/UserRoutes");
app.use("/users", usersController);

const patientsController = require("./controllers/PatientRoutes");
app.use("/patients", patientsController);

const patientrecordsController = require("./controllers/PatientRecordRoutes");
app.use("/patientrecords", patientrecordsController);

// Keep this route at the end of this file, only before the module.exports!
// A 404 route should only trigger if no preceding routes or middleware was run. 
// So, put this below where any other routes are placed within this file.
app.get('*', (request, response) => {
    response.status(404).json({
        message: "No route with that path found!",
        attemptedPath: request.path
    });
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Export everything needed to run the server.
module.exports = {
    HOST,
    PORT,
    app
}