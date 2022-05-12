const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const appLogger = require("../utils/appLogger");

module.exports.register = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(req.body.password, salt);

			const newUser = new User({
				name: req.body.name,
				password: hash,
				email: req.body.email,
			});

			const createdUser = await newUser.save();

			const token = jwt.sign(
				{
					_id: createdUser._id,
					name: createdUser.name,
					email: createdUser.email,
				},
				process.env.JWT_SECRET,
				{}
			);

			res.status(201).json({ user: createdUser, token });
		} else {
			res.status(403).json({ message: "User already exists!" });
		}
	} catch (err) {
		appLogger(err);
		res.status(500).json({ message: "Something went wrong", err });
	}
};

module.exports.login = (req, res) => {};
