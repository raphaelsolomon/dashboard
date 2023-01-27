const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Health = sequelize.define('healths', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    pfirst: {
        type: Sequelize.STRING,
    },
    
});
module.exports = Health;