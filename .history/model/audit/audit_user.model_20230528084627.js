const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');
const User = require('../user.model')

const Audit_User = sequelize.define('audit_users', {
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
    date_of_birth: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.TEXT,
    },
    gender: {
        type: Sequelize.STRING
    },
    date_of_birth: {
        type: Sequelize.STRING,
    }
});

Audit_User.hasOne(User);
User.belongsToMany(Audit_User);

module.exports = Audit_User;