const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Sweeper = sequelize.define('sweepers', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    age_group: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    occupation: {
        type: Sequelize.STRING,
    },
    institute: {
        type: Sequelize.STRING,
    },
});
module.exports = Health;