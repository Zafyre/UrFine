const Order = require("../models/order.model");
const appLogger = require("../utils/appLogger");

module.exports.create = async (req, res) => {
	try {
		const newOrder = new Order({
			products: req.body.products,
			totalPrice: req.body.totalPrice,
			user: req.user._id,
		});

		const order = await newOrder.save();

		const populatedOrder = await Order.populate(order, {
			path: "products.product",
		});

		res.status(201).json({ order: populatedOrder });
	} catch (err) {
		appLogger(err);
		res.status(500).json({ message: "Something went wrong", err });
	}
};

module.exports.getUserOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id })
			.sort({ createdAt: -1 })
			.populate("products.product")
			.exec();

		res.status(200).json({ orders });
	} catch (err) {
		appLogger(err);
		res.status(500).json({ message: "Something went wrong", err });
	}
};
