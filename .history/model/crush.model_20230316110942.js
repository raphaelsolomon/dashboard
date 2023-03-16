const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Crus = sequelize.define('sorts', {
    date: {
        type: Sequelize.DATEONLY,
    },
    plastic_weight: {
        type: Sequelize.STRING,
    },
    other_plastic_weight: {
        type: Sequelize.STRING,
        defaultValue: 'null'
    },
    cap_label: {
        type: Sequelize.STRING,
    },
    other_cap_label: {
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
module.exports = Sorting;