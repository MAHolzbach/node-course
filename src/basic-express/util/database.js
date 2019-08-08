const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "mierda2380", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
