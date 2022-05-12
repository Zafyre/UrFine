const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
	{
		patient: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},

		doctor: {
			type: mongoose.Types.ObjectId,
			ref: "Doctor",
		},

		time: Date,
	},

	{
		timestamps: true,
	}
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
