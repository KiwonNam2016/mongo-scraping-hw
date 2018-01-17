// Require mongoose
let mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
let Schema = mongoose.Schema;

//schema for Articles
let ArticleSchema = new Schema({

	headline:{
		type: String,
		required: true,
		trim: true
	},

	summary:{
		type: String,
		required: true,
		trim: true
	},

	url:{
		type: String,
		required: true,
		trim:true
	},

	imageUrl:{
		type: String,
		trim: true
	},

	notes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Note"
		}
	]

});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;