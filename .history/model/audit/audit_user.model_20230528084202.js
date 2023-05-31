const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');
const User = require('./')

const Audit_User = sequelize.define('audit_user', {
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

User

module.exports = 