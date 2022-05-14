const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	qualification: {
		type: String,
		required: true,
	},

	appointmentFee: {
		type: Number,
		required: true,
	},

	image: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
