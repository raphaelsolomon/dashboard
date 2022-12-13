const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Survey = sequelize.define('surveys', {
    purchased_date: {
        type: Sequelize.STRING,
    },
    purchased_cost: {
        type: Sequelize.STRING,
    },
    customer_name: {
        type: Sequelize.STRING,
    },
    phone_no: {
        type: Sequelize.STRING,
    },
    commodity: {
        type: Sequelize.STRING,
    },
    commodity_size: {
        type: Sequelize.STRING,
    },
    commodity_color: {
        type: Sequelize.STRING,
    },
    sales_date: {
        type: Sequelize.STRING,
    },
    sales_cost: {
        type: Sequelize.STRING,
    },
    delivery_street: {
        type: Sequelize.STRING,
    },
    purchasing_gender: {
        type: Sequelize.STRING,
    },
    mode_payment: {
        type: Sequelize.STRING,
    },
    delivery_location: {
        type: Sequelize.STRING,
    },
    mode_transaction: {
        type: Sequelize.STRING,
    },
    advertising_medium: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    }
});
module.exports = Survey;