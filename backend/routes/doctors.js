const express = require("express");
const { upload } = require("../config/multer");
const router = express.Router();

const doctorController = require("../controllers/doctor.controller");

router.post("/", upload("doctors").single("image"), doctorController.create);
router.get("/", doctorController.getAll);

module.exports = router;
