const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Fort = sequelize.define('forts', {
    date: {
        type: Sequelize.STRING,
        allowNull: false,
        uniqueKey: true,
    },
   
});

module.exports = Fort;