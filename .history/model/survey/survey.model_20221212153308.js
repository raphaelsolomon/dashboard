const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Survey = sequelize.define('surveys', {
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    date_of_birth: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    emp_status: {
        type: Sequelize.STRING,
    },
    emp_qualification: {
        type: Sequelize.STRING,
    },
    first_name: {
        type: Sequelize.STRING,
    },
    first_name: {
        type: Sequelize.STRING,
    },
    first_name: {
        type: Sequelize.STRING,
    },
    first_name: {
        type: Sequelize.STRING,
    },


});
module.exports = Survey;