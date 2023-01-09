const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Hair_Cream = sequelize.define('creams', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});
module.exports = Hair_Cream;