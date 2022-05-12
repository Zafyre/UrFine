const Appointment = require("../models/appointment.model");
const appLogger = require("../utils/appLogger");

module.exports.create = async (req, res) => {
	try {
		const newAppointment = new Appointment({
			...req.body,
			patient: req.user._id,
		});

		const appointment = await newAppointment.save();

		res.status(201).json({ appointment });
	} catch (err) {
		appLogger(err);
		res.status(500).json({ message: "Something went wrong", err });
	}
};

module.exports.getUserAppointments = async (req, res) => {
	try {
		const appointments = Appointment.find({ patient: req.user._id });

		res.status(200).json({ appointments });
	} catch (err) {
		appLogger(err);
		res.status(500).json({ message: "Something went wrong", err });
	}
};
