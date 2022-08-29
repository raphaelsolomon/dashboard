const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const User = sequelize.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        uniqueKey: true,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    phone_number: {
        type: Sequelize.STRING
    },
    business_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    contact_person: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    chart1: {
        type: Sequelize.STRING,
    },
    chart2: {
        type: Sequelize.TEXT,
    },
    chart3: {
        type: Sequelize.TEXT,
    },
    token: {
        type: Sequelize.TEXT,
    }
});

module.exports = User;