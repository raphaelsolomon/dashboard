const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Powder = sequelize.define('powders', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        uniqueKey: true,
        unique:"name" 
    },
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});
module.exports = Powder;