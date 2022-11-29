const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const ORTHER_HSE = sequelize.define('otherhses', {
    date: {
        type: Sequelize.DATEONLY,
    },
    comment: {
        type: Sequelize.TEXT,
    }
});

module.exports = ORTHER_HSE;