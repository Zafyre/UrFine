const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: String,
	username: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
