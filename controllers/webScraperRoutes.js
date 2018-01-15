// import required dependencies
let path = require("path");
let axios = require("axios");
let cheerio = require("cheerio"); 
let mongoose = require("mongoose"); 
let db = require("../models"); 

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/week18Populater", {
  useMongoClient: true
});



//export the routes
module.exports = (app) => {

//get routes
	app.get("/", (req, res) => res.render(index))



// A GET route for scraping the onion news network website
app.get("/scrape", function(req, res) {




}