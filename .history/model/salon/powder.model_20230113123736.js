const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Powder = sequelize.define('powders', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});
module.exports = Powder;