const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Survey = sequelize.define('surveys', {
    purchased_date: {
        type: Sequelize.STRING,
    },
});
module.exports = Survey;