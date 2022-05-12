const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
	{
		patient: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},

		doctor: {
			type: mongoose.Types.ObjectId,
			ref: "Doctor",
			required: true,
		},

		time: Date,
	},

	{
		timestamps: true,
	}
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
