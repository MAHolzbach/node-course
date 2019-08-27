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
  User.findById("5d646ec8b592870b78b10b21")
    .then(user => {
      req.user = user;
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
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Mike",
          email: "test@test.com",
          cart: { items: [] }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => console.log(err));
