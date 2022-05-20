const Product = require("../models/product.model");
const appLogger = require("../utils/appLogger");

module.exports.create = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
    });

    if (req.file) {
      newProduct.image = req.file.path.substring(req.file.path.indexOf("\\"));
    }

    const product = await newProduct.save();

    res.status(201).json({ product });
  } catch (err) {
    appLogger(err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({ products });
  } catch (err) {
    appLogger(err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};
