const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const notFoundController = require("./controllers/404");
const path = require("path");
const User = require("./models/user");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5d582a1617dcfe22c8715666")
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(notFoundController.handle404);

mongoose
  .connect(
    "mongodb+srv://mike:AyyptOYxjVNPnXEQ@nodecourse-7tzcj.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
