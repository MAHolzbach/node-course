const Product = require("../models/product");
const Order = require("../models/order");

exports.getIndex = (req, res) => {
  Product.find().then(products => {
    res.render("shop/index", {
      docTitle: "Shop",
      products,
      path: "/",
      isAuthenticated: req.isLoggedIn
    });
  });
};
exports.getProducts = (req, res) => {
  Product.find().then(products => {
    console.log(products);
    res.render("shop/product-list", {
      docTitle: "All Products",
      products,
      path: "/products",
      isAuthenticated: req.isLoggedIn
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
        product,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};
exports.getCart = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
        products,
        isAuthenticated: req.isLoggedIn
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
      console.log(result);
      res.redirect("/cart");
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
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(item => {
        return { quantity: item.quantity, product: { ...item.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(result => res.redirect("/orders"))
    .catch(err => console.log(err));
};
exports.getOrders = (req, res) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      res.render("shop/orders", {
        docTitle: "Your Orders",
        path: "/orders",
        orders,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};
exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    docTitle: "Checkout",
    isAuthenticated: req.isLoggedIn
  });
};
