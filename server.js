// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Middleware
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
// Spin up the server
const server = app.listen(port, listening);
// Callback function for debug
function listening() {
    console.log(`Runnin on localhost: ${port}`);
}

server.timeout = 10000

// Initialize all route with a callback function
app.get("/all", getAllData);
// Callback function to complete GET '/all'
function getAllData(req, res) {
    res.send(projectData);
}
// Post Route
app.post("/addData", addData);
// Post callback
function addData(req, res) {
    Object.assign(projectData, req.body)
    res.send()
}
