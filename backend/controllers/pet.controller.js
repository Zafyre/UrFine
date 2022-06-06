const Pet = require("../models/pet.model");
const appLogger = require("../utils/appLogger");

module.exports.create = async (req, res) => {
	try {
		const newPet = new Pet({
			...req.body,
		});

		if (req.file) {
			newPet.image = req.file.path.substring(req.file.path.indexOf("\\"));
		}

		const pet = await newPet.save();

		res.status(201).json({ pet });
	} catch (err) {
		appLogger(err);
		res.status(500).json({ message: "Something went wrong", err });
	}
};

module.exports.getAll = async (req, res) => {
	try {
		const pets = await Pet.find({});

		res.status(200).json({ pets });
	} catch (err) {
		appLogger(err);
		res.status(500).json({ message: "Something went wrong", err });
	}
};
