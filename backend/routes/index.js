const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/doctors", require("./doctors"));
router.use("/products", require("./products"));
router.use("/appointments", require("./appointments"));
router.use("/orders", require("./orders"));

module.exports = router;
