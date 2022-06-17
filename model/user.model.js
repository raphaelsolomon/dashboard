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
        allowNull: false,
        uniqueKey: true,
    },
    trade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    spreadsheet: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    software: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    subscribe: {
        type: Sequelize.STRING,
        allowNull: false,
        uniqueKey: true,
    },
    social_media: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    client_location: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

module.exports = User;