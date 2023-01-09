const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Powder = sequelize.define('powders', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    salon_name: {
        type: Sequelize.STRING,
    }
});
module.exports = Powder;