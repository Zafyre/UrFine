const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},

		products: [
			{
				product: {
					type: mongoose.Types.ObjectId,
					ref: "Product",
				},
				quantity: Number,
			},
		],

		pets: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Pet",
			},
		],

		totalPrice: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
