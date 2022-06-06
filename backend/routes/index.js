const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

router.post("/payment", async (req, res) => {
	let { amount, id } = req.body;
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true,
		});
		console.log("Payment", payment);
		res.status(200).json({
			message: "Payment successful",
			success: true,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Payment failed",
			success: false,
		});
	}
});

router.use("/auth", require("./auth"));
router.use("/doctors", require("./doctors"));
router.use("/products", require("./products"));
router.use("/pets", require("./pets"));
router.use("/appointments", require("./appointments"));
router.use("/orders", require("./orders"));

module.exports = router;
