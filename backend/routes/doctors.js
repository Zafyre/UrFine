const mongoose = require("mongoose");
const router = mongoose.Router();

const doctorController = require("../controllers/doctor.controller");

router.post("/", doctorController.create);
router.get("/", doctorController.getAll);

module.exports = router;
