const Product = require("../models/product");

exports.getIndex = (req, res) => {
  Product.find().then(products => {
    res.render("shop/index", {
      docTitle: "Shop",
      products,
      path: "/"
    });
  });
};
exports.getProducts = (req, res) => {
  Product.find().then(products => {
    console.log(products);
    res.render("shop/product-list", {
      docTitle: "All Products",
      products,
      path: "/products"
    });
  });
};
exports.getProductDetails = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render("shop/product-detail", {
        docTitle: product.title,
        path: "/products",
        product
      });
    })
    .catch(err => console.log(err));
};
exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then(products => {
      res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
        products
      });
    })
    .catch(err => console.log(err));
};
exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect("/cart");
      console.log(result);
    });
};
exports.postCartDelete = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .deleteFromCart(prodId)
    .then(result => res.redirect("/cart"))
    .catch(err => console.log(err));
};
exports.postOrder = (req, res) => {
  req.user
    .addOrder()
    .then(result => res.redirect("/orders"))
    .catch(err => console.log(err));
};
exports.getOrders = (req, res) => {
  req.user
    .getOrders()
    .then(orders => {
      console.log("ORDERS:", orders);
      res.render("shop/orders", {
        docTitle: "Your Orders",
        path: "/orders",
        orders
      });
    })
    .catch(err => console.log(err));
};
exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    docTitle: "Checkout"
  });
};
