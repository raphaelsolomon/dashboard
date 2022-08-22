const Sequelize = require("sequelize");
const sequelize = require("../config/database.config");

const Notification = sequelize.define("notifications", {
  message: {
    type: Sequelize.TEXT,
  },
  isseen: {
    type: Sequelize.b,
  },
});

module.exports = Notification;
