const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Crushing = sequelize.define('crushs', {
    date: {
        type: Sequelize.STRING,
    },
    machine: {
        type: Sequelize.STRING,
    },
    flakes: {
        type: Sequelize.STRING,
        defaultValue: 'null'
    },
    qty: {
        type: Sequelize.,
    },
    operator: {
        type: Sequelize.STRING,
        defaultValue: 'null'
    }
});
module.exports = Crushing;