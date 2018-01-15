//dependecies
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

//initialize server
const app = express();

let PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Start server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});