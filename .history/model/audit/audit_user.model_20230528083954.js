const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Audit_User = sequelize.define('deliveries', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    address: {
        type: Sequelize.TEXT,
    },
    gender: {
        type: Sequelize.STRING
    },
    age_group: {
        type: Sequelize.STRING,
    }
});

module.exports = 