const Appointment = require("../models/appointment.model");
const appLogger = require("../utils/appLogger");

module.exports.create = async (req, res) => {
	try {
		const newAppointment = new Appointment({
			...req.body,
			patient: req.user._id,
		});

		const appointment = await newAppointment.save();

		const populatedAppointment = await Appointment.populate(appointment, {
			path: "doctor",
		});

		res.status(201).json({ appointment: populatedAppointment });
	} catch (err) {
		appLogger(err);
		res.status(500).json({ message: "Something went wrong", err });
	}
};

module.exports.getUserAppointments = async (req, res) => {
	try {
		const appointments = await Appointment.find({ patient: req.user._id })
			.populate("doctor")
			.populate({
				path: "patient",
				select: "-password",
			})
			.exec();

		res.status(200).json({ appointments });
	} catch (err) {
		appLogger(err);
		res.status(500).json({ message: "Something went wrong", err });
	}
};
