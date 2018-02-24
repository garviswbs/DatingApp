const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Create Express Server
var app = express();

// Set Port
var PORT = process.env.PORT || 8080;

// Handle data parsing
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Router 
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Listen && Start
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

// app.get("/", function (req, res) {
//     res.send('home.html');
// })