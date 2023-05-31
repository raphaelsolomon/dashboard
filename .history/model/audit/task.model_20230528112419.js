const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');
const User = require('../user.model')

const TAsk = sequelize.define('audittasks', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    facebook: {
        type: Sequelize.TEXT,
    },
    instagram: {
        type: Sequelize.STRING
    },
    twitter: {
        type: Sequelize.STRING,
    },
    linkedIn: {
        type: Sequelize.STRING,
    }
});

module.exports = Audit_User;