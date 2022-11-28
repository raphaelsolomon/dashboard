const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');


const LogisticsData = sequelize.define('logistics', {
    consignor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    itemToBeDelivered: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dateOfOrder: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pickupaddress_str: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pickupaddress_area: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pickup_time: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    consignee: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    c_phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    c_deliveryAddress_str: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    c_deliveryAddress_area: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    c_deliveryTime: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mode_of_pay: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rider: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    amount_paid: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    payment_status: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
});
module.exports = LogisticsData;