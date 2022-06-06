const mongoose = require("mongoose");

const petSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	price: {
		type: Number,
		required: true,
	},

	breed: {
		type: String,
		required: true,
	},

	description: String,
	image: String,
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
