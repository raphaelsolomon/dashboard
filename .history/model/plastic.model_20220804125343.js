const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Plastic = sequelize.define('plastics', {
    retrieved_from: {
        type: Sequelize.TEXT,
    },
    date: {
        type: Sequelize.DA,
    },
    plastic_size: {
        type: Sequelize.STRING,
    },
    tonnage: {
        type: Sequelize.STRING,
    },
    product: {
        type: Sequelize.STRING,
    },
    zone: {
        type: Sequelize.STRING,
    },
    volume_of_plastics: {
        type: Sequelize.STRING,
    },
    initial_content: {
        type: Sequelize.STRING,
    },
    manufacturer: {
        type: Sequelize.STRING,
    }
});
module.exports = Plastic;