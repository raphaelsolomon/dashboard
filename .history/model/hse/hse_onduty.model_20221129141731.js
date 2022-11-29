const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const HSE_ONDUTY = sequelize.define('hseondutys', {
    date: {
        type: Sequelize.DATEONLY,
    },
    name: {
        type: Sequelize.STRING,
    },
    shift: {
        type: Sequelize.STRING,
    },
});

module.exports = HSE_ONDUTY;