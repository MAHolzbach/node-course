const User = require("../models/user");

exports.getLogin = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;
  res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    isAuthenticated: isLoggedIn
  });
};
exports.postLogin = (req, res) => {
  User.findById("5d6e9c753641360078f2e717")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch(err => console.log(err));
};
exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    path: "/signup",
    docTitle: "Signup",
    isAuthenticated: false
  });
};
exports.postSignup = (req, res) => {
  console.log("req:", req);
};
