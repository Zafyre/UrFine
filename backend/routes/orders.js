const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.get("/", authMiddleware, orderController.getUserOrders);
router.post("/", authMiddleware, orderController.create);

module.exports = router;
