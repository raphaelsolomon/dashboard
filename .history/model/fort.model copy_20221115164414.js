const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Fort = sequelize.define('forts', {
    date: {
        type: Sequelize.STRING,
    },
    date: {
        type: Sequelize.STRING,
    },
    date: {
        type: Sequelize.STRING,
    },
    date: {
        type: Sequelize.STRING,
    },
    date: {
        type: Sequelize.STRING,
    },
    date: {
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