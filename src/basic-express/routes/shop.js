const express = require("express");
const path = require("path");
const productsController = require("../controllers/products");

const router = express.Router();

router.get("/", productsController.getShop);
router.get("/products", productsController.getProducts);
router.get("/cart", productsController.getCart);

module.exports = router;
