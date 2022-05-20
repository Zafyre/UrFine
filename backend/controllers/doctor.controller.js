const Doctor = require("../models/doctor.model");
const appLogger = require("../utils/appLogger");

module.exports.create = async (req, res) => {
  try {
    const newDoctor = new Doctor({
      ...req.body,
    });

    if (req.file) {
      newDoctor.image = req.file.path.substring(req.file.path.indexOf("\\"));
    }

    const doctor = await newDoctor.save();

    res.status(201).json({ doctor });
  } catch (err) {
    appLogger(err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const doctors = await Doctor.find({});

    res.status(200).json({ doctors });
  } catch (err) {
    appLogger(err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};

module.exports.getDoctorById = async (req, res) => {
  try {
    const { doctorID } = req.params;
    const doctor = await Doctor.findById(doctorID);

    if (!doctor) {
      res.status(404).json({ message: "Doctor not found!" });
    } else {
      res.status(200).json({ doctor });
    }
  } catch (err) {
    appLogger(err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};
