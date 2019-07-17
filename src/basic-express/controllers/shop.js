const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getShop = (req, res) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", { docTitle: "Shop", products, path: "/" });
  });
};
exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      docTitle: "All Products",
      products,
      path: "/products"
    });
  });
};
exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      docTitle: "Shop",
      products,
      path: "/"
    });
  });
};
exports.getCart = (req, res) => {
  const cart = new Cart();
  cart.listProducts();
  res.render("shop/cart"), { docTitle: "Your Cart", path: "/shop/cart" };
};
exports.getOrders = (req, res) => {
  res.render("shop/orders"), { docTitle: "Your Orders", path: "/shop/orders" };
};
exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    docTitle: "Checkout"
  });
};
