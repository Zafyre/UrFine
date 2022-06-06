const express = require("express");
const { upload } = require("../config/multer");
const router = express.Router();

const petController = require("../controllers/pet.controller");

router.post("/", upload("pets").single("image"), petController.create);
router.get("/", petController.getAll);

module.exports = router;
