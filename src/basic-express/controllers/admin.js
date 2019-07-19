const Product = require("../models/product");

exports.getAdminProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      products,
      docTitle: "Admin Products",
      path: "admin/products"
    });
  });
};
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product"
  });
};
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, price, description);

  product.save();
  res.redirect("/");
};
exports.getEditProduct = (req, res) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId, product => {
    res.render("admin/edit-product", {
      docTitle: product.title,
      path: "/edit-product",
      product
    });
  });
};
exports.deleteAdminProducts = (req, res) => {
  const prodId = req.params.productId;

  const product = new Product(id, title, imageUrl, price, description);

  product.delete(prodId);
  res.redirect("/products");
};
