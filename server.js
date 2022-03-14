// Setup empty JS object to act as endpoint for all routes
let projectData = {'message': 'hello world'};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// Create a post route that adds the data to the Server
const addData = (req, res) => {
    projectData = req.body;
    console.log("add Data: ", projectData);
    res.status(200).send(projectData);
  };

app.post('/add', addData);




// Create a get route that respnds with all required data
const sendData = (req, res) => {
  console.log("send Data: ", projectData);
  res.status(200).send(projectData);
}
app.get("/results", sendData);