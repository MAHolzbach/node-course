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
    path: "/admin/add-product",
    editing: false
  });
};
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl);

  product
    .save()
    .then(res => {
      console.log("Product created!");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};
// exports.getEditProduct = (req, res) => {
//   const editMode = req.query.edit;
//   const prodId = req.params.productId;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   Product.findById(prodId, product => {
//     res.render("admin/edit-product", {
//       docTitle: "Edit Product",
//       path: "/admin/edit-product",
//       editing: editMode,
//       product
//     });
//   });
// };
// exports.postEditProduct = (req, res) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;
//   const updatedDescription = req.body.description;

//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     updatedImageUrl,
//     updatedPrice,
//     updatedDescription
//   );

//   updatedProduct.save();

//   res.redirect("/admin/products");
// };
// exports.postDeleteProduct = (req, res) => {
//   const prodId = req.body.productId;
//   Product.delete(prodId);
//   res.redirect("/admin/products");
// };
