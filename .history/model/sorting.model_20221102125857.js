const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Sorting = sequelize.define('plastics', {
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
    other_plastic_cap: {
        type: Sequelize.STRING,
    },
    plastic_color: {
        type: Sequelize.STRING,
    },
    other_plastic_color: {
        type: Sequelize.STRING,
    },
    initial_content: {
        type: Sequelize.STRING,
    },
    manufacturer: {
        type: Sequelize.STRING,
    }
});
module.exports = Sorting;