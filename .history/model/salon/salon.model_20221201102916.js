const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Saloon = sequelize.define('saloons', {
    salon_name: {
        type: Sequelize.STRING,
    },
    salon_owner: {
        type: Sequelize.STRING,
    },
    contact: {
        type: Sequelize.INTEGER,
    },

    total_manhours: {
        type: Sequelize.STRING,
    },
    jobstatus: {
        type: Sequelize.STRING,
    },

    comment: {
        type: Sequelize.STRING,
    }
});

module.exports = Saloon;