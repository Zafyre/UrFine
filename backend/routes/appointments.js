const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const appointmentController = require("../controllers/appointment.controller");

router.post("/", authMiddleware, appointmentController.create);
router.get("/", authMiddleware, appointmentController.getUserAppointments);

module.exports = router;
