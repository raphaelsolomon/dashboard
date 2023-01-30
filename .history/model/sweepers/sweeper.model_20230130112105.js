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
    address: {
        type: Sequelize.TEXT,
    },
    age_group: {
        type: Sequelize.STRING,
    },
    education: {
        type: Sequelize.STRING,
    },
    income_status: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    ///==================================================================
    sweeping_experience
});
module.exports = Sweeper;