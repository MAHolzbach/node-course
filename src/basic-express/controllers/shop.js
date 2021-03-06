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
exports.getProductDetails = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render("shop/product-detail", {
      docTitle: product.title,
      path: "/products",
      product
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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
        products: cartProducts
      });
    });
  });
};
exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};
exports.postCartDelete = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
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
