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
mongooseConnection.on("error", console.error.bind(console, "connection error:"));
mongooseConnection.once("open", function() {
  console.log(`Sucessfully Connected to Mongo`);
});

//export the routes
module.exports = (app) => {

	// Routes

	// A GET route for scraping time magazine website
	app.get("/scrape", (req, res) => {
	  //grab the body of the html with request
		axios.get("www.newsweek.com").then( (response) => {
		    // load resonse data into cheerio, save it to $ selector
		    let $ = cheerio.load(response.data);

            //array that will hold the result objects
            let result = {};

		    // grave the h2 tages within the article tags
		    $("article").each( (i, element) => {
	      	// Save an empty result object


    		    // Add text and href of every link, and save them as properties of the result object
    			let headline = $(this).children("div")
    				.children("h3")
    				.children("a")
    				.text();
    			//url link to the actual article
    			let url = $(this).children("div")
    				.children("h3")
    				.children("a")
    				.attr("herf");
    			//get the article "exerpt"
    			let summary = $(this).children("div")
    				.children("div")
    				.text();
    			let imageUrl = $(this).children("div")
    			  .children("div")
                  .children("picture")
                  .children("img")
    			  .attr("src");

                articleObject = {
                    headline: headline,
                    url: url,
                    summary: summary,
                    imageUrl: imageUrl
                };

                //push the article object into results array
                result.push(articleObject)
	    	});
	  	});
	});



	// Route for getting all Articles from the db
	app.get("/articles", (req, res) => {
	// Grab all the articles
		db.Article
			.find({})
			.then((dbArticle) => {
  			// If we were able to successfully find Articles, send them back to the client
  				res.json(dbArticle);
			})
			.catch((err) => {
  			// If an error occurred, send it to the client
  				res.json(err);
		});
	});


	//Route for populating an Article with a note

	app.get("/articles/:id", (req, res) => {
		db.Article
    		.findOne({ _id: req.params.id })
    		// ..and populate all of the notes associated with it
    		.populate("note")
    		.then((dbArticle) => {
      		// If we were able to successfully find an Article with the given id, send it back to the client
      		res.json(dbArticle);
    	})
    	.catch((err) => {
      		// If an error occurred, send it to the client
      		res.json(err);
    	});
	});

}
