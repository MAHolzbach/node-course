const bcrypt = require("bcryptjs");
const User = require("../models/user");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    errorMessage: req.flash("error")
  });
};
exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash(
          "error",
          "Your log in information was incorrect. Please try again."
        );
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch(err => {
          console.log(err);
          res.redirect("/login");
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
    docTitle: "Signup"
  });
};
exports.postSignup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
          const msg = {
            to: email,
            from: "test@example.com",
            subject: "Sending with Twilio SendGrid is Fun",
            text: "and easy to do anywhere, even with Node.js",
            html: "<strong>and easy to do anywhere, even with Node.js</strong>"
          };
          sgMail.send(msg);
        });
    })
    .catch(err => console.log("err :", err));
};
