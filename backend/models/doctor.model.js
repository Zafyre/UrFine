const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
	name: String,
	qualification: String,
	image: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
