/************************************************************************************
* WEB322 â€“ Project (Winter 2022)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Prabhleen Kaur
* Student ID: 146094206
* Course/Section: WEB322/NDD
*
************************************************************************************/

const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");

//Setup API Key
const dotenv = require('dotenv');
dotenv.config({ path: "./config/keys.env"});

// Setup a static resource folder
app.use(express.static("public"));

app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");

// Set up body parser
app.use(express.urlencoded({ extended: false }));

//Setup express session
app.use(session({
    secret: process.env.SESSION_SECRET, //secret used to protect the cookies
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    req.session.isClerk;
    next();
});


// Set up and connect to MongoDB -> reference taken from course notes
mongoose.connect(process.env.MONGO_DB_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected SUCCESSFULLY to the MongoDB database.");
})
.catch((err) => {
    console.log(`*** Connection with ${err} NOT SUCCESSFUL ***`);
});

// Load the controllers into Express
const userController = require("./controllers/user");
app.use("/", userController);

const generalController = require("./controllers/general");
const { redirect } = require("express/lib/response");
app.use("/", generalController);


// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);


    