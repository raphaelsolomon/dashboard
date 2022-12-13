const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Survey = sequelize.define('surveys', {
    first_name: {
        type: Sequelize.STRING,
    },
});
module.exports = Survey;