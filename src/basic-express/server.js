require("dotenv").config();
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const notFoundController = require("./controllers/404");
const path = require("path");
const User = require("./models/user");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const MONGODB_URI =
  "mongodb+srv://mike:AyyptOYxjVNPnXEQ@nodecourse-7tzcj.mongodb.net/shop";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});
const csrfProtection = csrf();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "secret", resave: false, saveUninitialized: false, store })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(notFoundController.handle404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
