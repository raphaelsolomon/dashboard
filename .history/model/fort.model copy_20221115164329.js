const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Fort = sequelize.define('forts', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        uniqueKey: true,
    },
   
});

module.exports = Fort;