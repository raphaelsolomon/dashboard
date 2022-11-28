const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Water_And_Oil = sequelize.define('waters', {
    date: {
        type: Sequelize.DATE,
    },
    diesel: {
        type: Sequelize.STRING,
    },
    petrol: {
        type: Sequelize.STRING,
    },
    others: {
        type: Sequelize.STRING,
    },
    water: {
        type: Sequelize.STRING,
    }
});

module.exports = Water_And_Oil;