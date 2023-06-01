const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const User = sequelize.define('users', {
    avatar: {
        type: Sequelize.STRING,
        defaultValue: "no"
    },
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
    date_of_birth: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
        defaultValue: 'Custom'
    },
    address: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    trade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    type: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    chart1: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    chart2: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    chart3: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    token: {
        type: Sequelize.TEXT,
    }
});

module.exports = User;