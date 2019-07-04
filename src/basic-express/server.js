const express = require("express");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
