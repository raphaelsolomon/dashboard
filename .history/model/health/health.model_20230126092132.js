const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Health = sequelize.define('healths', {
    purchased_date: {
        type: Sequelize.STRING,
    },
    
});
module.exports = Health;