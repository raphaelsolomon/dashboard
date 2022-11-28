const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const HSE_INSPECTION = sequelize.define('hseinspections', {
    date: {
        type: Sequelize.DATE,
    },

    descriptions: {
        type: Sequelize.TEXT,
    },
    action: {
        type: Sequelize.STRING,
    },

    action_by: {
        type: Sequelize.STRING,
    },
    close_out_date: {
        type: Sequelize.DATEONLY,
    },

    remarks: {
        type: Sequelize.STRING,
    }
});

module.exports = HSE_INSPECTION;