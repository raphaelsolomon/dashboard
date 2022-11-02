const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Sorting = sequelize.define('sorts', {
    date: {
        type: Sequelize.DATEONLY,
    },
    plastic_weight: {
        type: Sequelize.STRING,
    },
    other_plastic_weight: {
        type: Sequelize.STRING,
    },
    cap_label: {
        type: Sequelize.STRING,
    },
    other_cap_label: {
        type: Sequelize.STRING,
    },
    plastic_color: {
        type: Sequelize.STRING,
    },
    other_plastic_color: {
        type: Sequelize.STRING,
    },
    unit: {
        type: Sequelize.STRING,
    }
});
module.exports = Sorting;