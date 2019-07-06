const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
  const products = adminData.products;
  res.render("shop", { docTitle: "Shop", products, path: "/" });
});

module.exports = router;
