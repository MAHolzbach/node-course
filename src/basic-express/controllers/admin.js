const Product = require("../models/product");

exports.getAdminProducts = (req, res) => {
  Product.find()
    // .select("title price -_id")
    // .populate("userId", "name")
    .then(products => {
      console.log(products);
      res.render("admin/products", {
        products,
        docTitle: "Admin Products",
        path: "admin/products",
        isAuthenticated: req.session.isLoggedIn
      });
    });
};
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user
  });

  product
    .save()
    .then(result => {
      console.log("Product created!");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(prodId).then(product => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
      isAuthenticated: req.session.isLoggedIn
    });
  });
};
exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.findById(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImageUrl;
    return product
      .save()
      .then(result => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      })
      .catch(err => console.log(err));
  });
};
exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId).then(() => {
    console.log("PRODUCT DESTROYED!");
    res.redirect("/admin/products");
  });
};
