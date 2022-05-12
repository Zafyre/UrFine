const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},

	products: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Product",
		},
	],
});
