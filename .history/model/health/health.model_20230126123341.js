const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Health = sequelize.define('healths', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    phone_number: {
        type: Sequelize.STRING,
    },
    age_group: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    medical_role: {
        type: Sequelize.STRING,
    },
    institute: {
        type: Sequelize.STRING,
    },
});
module.exports = Health;