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
  User.findById("5d66ed8e7de1d216fc20ddb1")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch(err => console.log(err));
};
