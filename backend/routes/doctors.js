const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctor.controller");

router.post("/", doctorController.create);
router.get("/", doctorController.getAll);

module.exports = router;
