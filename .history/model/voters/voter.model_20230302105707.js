const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Voter = sequelize.define('voters', {
    registered_nigerian: {
        type: Sequelize.STRING,
    },
    did_participate_in_preidential: {
        type: Sequelize.STRING,
    },
    supported_party: {
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
module.exports = Voter;