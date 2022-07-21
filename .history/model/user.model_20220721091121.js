const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const User = sequelize.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        uniqueKey: false,
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
    spreadsheet: {
    },
    software: {
    },
    subscribe: {
        type: Sequelize.STRING,
    },
    social_media: {
        type: Sequelize.STRING,
    },
    client_location: {
        type: Sequelize.STRING,
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

module.exports = User;