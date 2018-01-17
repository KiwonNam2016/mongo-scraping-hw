// import required dependencies
let path = require("path");
let axios = require("axios");
let cheerio = require("cheerio"); 
let mongoose = require("mongoose"); 
let db = require("../models"); 

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/webScraper", {
  useMongoClient: true
});

let mongooseConnection = mongoose.connection;
mongooseConnection.on('error', console.error.bind(console, 'connection error:'));
mongooseConnection.once('open', function() {
  console.log(`Sucessfully Connected to Mongo`);
});

//export the routes
module.exports = (app) => {

	// Routes

	// A GET route for scraping time magazine website
	app.get("/scrape", (req, res) => {
	  //grab the body of the html with request
		axios.get("time.com").then( (response) => {
		    // load resonse data into cheerio, save it to $ selector
		    let $ = cheerio.load(response.data);

		    // grave the h2 tages within the article tags
		    $("article").each( (i, element) => {
	      	// Save an empty result object
	      	let result = {};

		      // Add text and href of every link, and save them as properties of the result object
				result.headline = $(this).children("div")
					.children("h2")
					.children("a")
					.text();
				//url link to the actual article
				result.url = $(this).children("div")
					.children("h2")
					.children("a")
					.attr("herf");
				//get the article "exerpt"
				result.summary = $(this).children("div")
					.children("p")
					.text();
				result.imageUrl = $(this)
				  .children("figure")
				  .children("a")
				  .attr("src");

				// Create a new Article using the `result` object built from scraping
				db.Article
					.create(result)
					.then( (dbArticle) => {
			  		// If we were able to successfully scrape and save an Article, send a message to the client
			  		res.send("Scrape Complete");
				})
				.catch( (err) => {
			  	// If an error occurred, send it to the client
			  		res.json(err);
				});
	    	});
	  	});
	});
}