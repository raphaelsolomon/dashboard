const Sequelize = require("sequelize");
const sequelize = require("../config/database.config");

const Notification = sequelize.define("notifications", {
  message: {
    type: Sequelize.TEXT,
  },
  isseen: {
    type: Sequelize.BOOLEAN,
    default
  },
});

module.exports = Notification;
