const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Crushing = sequelize.define('sorts', {
    date: {
        type: Sequelize.DATEONLY,
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
    },
    plastic_color: {
        type: Sequelize.STRING,
    },
    other_plastic_color: {
        type: Sequelize.STRING,
        defaultValue: 'null'
    },
    unit: {
        type: Sequelize.STRING,
    }
});
module.exports = Crushing;