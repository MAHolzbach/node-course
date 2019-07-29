const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "nodecourse", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
