const Product = require("../models/product");

exports.getAdminProducts = (req, res) => {
  Product.findAll()
    .then(products => {
      res.render("admin/products", {
        products,
        docTitle: "Admin Products",
        path: "admin/products"
      });
    })
    .catch(err => console.log(err));
};
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title,
    imageUrl,
    price,
    description
  })
    .then(result => console.log("PRODUCT CREATED."))
    .catch(err => console.error(err));
};
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log("error:", error));
};
exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log("PRODUCT HAS BEEN UPDATED");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};
exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.delete(prodId);
  res.redirect("/admin/products");
};
