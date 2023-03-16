const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Crushing = sequelize.define('crushs', {
    date: {
        type: Sequelize.String,
    },
    machine: {
        type: Sequelize.STRING,
    },
    flakes: {
        type: Sequelize.STRING,
        defaultValue: 'null'
    },
    qty: {
        type: Sequelize.STRING,
    },
    operator: {
        type: Sequelize.STRING,
        defaultValue: 'null'
    }
});
module.exports = Crushing;