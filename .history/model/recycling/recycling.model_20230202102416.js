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
    occupation: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    //==================================================================
    recycle_plastic: {
        type: Sequelize.STRING,
    },
    improper_disposal: {
        type: Sequelize.STRING,
    },
    disposal_method: {
        type: Sequelize.STRING,
    },
    resources_provided: {
        type: Sequelize.STRING,
    },
    waste_blocking_drainage: {
        type: Sequelize.TEXT,
    },
    future_drainage_blocking: {
        type: Sequelize.STRING,
    },
    consequences_of_improper: {
        type: Sequelize.STRING,
    },
    plastic_waste_blockage: {
        type: Sequelize.STRING,
    },
    motivation: {
        type: Sequelize.STRING,
    },
    //===============================================================solution-====================
});
module.exports = Sweeper;