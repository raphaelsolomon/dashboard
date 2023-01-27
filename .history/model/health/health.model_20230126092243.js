const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Health = sequelize.define('healths', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    first_name: {
        type: Sequelize.STRING,
    },
    
});
module.exports = Health;