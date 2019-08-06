const express = require("express");
// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const notFoundController = require("./controllers/404");
const path = require("path");
const mongoConnect = require("./util/database");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);
app.use(notFoundController.handle404);

mongoConnect(client => {
  console.log(client);
  app.listen(3000);
});
