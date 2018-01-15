// Require mongoose
let mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
let Schema = mongoose.Schema;

let NoteSchema = new Schema({
	body: String
});

let Note = mongoose.model("Note", NoteSchema);