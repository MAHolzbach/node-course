const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAdminProducts = (req, res) => {
  res.render("admin/products", {
    docTitle: "Admin Products",
    path: "admin/products"
  });
};
exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product"
  });
};
exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};
exports.getShop = (req, res) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", { docTitle: "Shop", products, path: "/" });
  });
};
exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      docTitle: "Product List",
      products,
      path: "/product-list"
    });
  });
};
exports.getCart = (req, res) => {
  const cart = new Cart();
  cart.listProducts();
  res.render("shop/cart"), { docTitle: "Cart", path: "/shop/cart" };
};
