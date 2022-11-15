const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Fort = sequelize.define('forts', {
    date: {
        type: Sequelize.STRING,
    },
    existing: {
        type: Sequelize.STRING,
    },
    supplier: {
        type: Sequelize.STRING,
    },
    plateno: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    timeIn: {
        type: Sequelize.STRING,
    },
    timeOut: {
        type: Sequelize.STRING,
    },
    preparedBy: {
        type: Sequelize.STRING,
    },
   
});

module.exports = Fort;