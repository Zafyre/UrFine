const express = require("express");
const { upload } = require("../config/multer");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.post("/", upload("products").single("image"), productController.create);
router.get("/", productController.getAll);

module.exports = router;
