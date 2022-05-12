const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/doctors", require("./doctors"));
router.use("/products", require("./products"));
router.use("/appointments", require("./appointments"));

module.exports = router;
