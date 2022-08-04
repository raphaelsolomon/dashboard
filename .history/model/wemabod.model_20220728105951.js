const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Wemabod = sequelize.define('wemabods', {
    date: {
        type: Sequelize.STRING
    },
    time: {
        
    }
});

module.exports = Wemabod;