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
    address: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.STRING,
    },
    salon_type: {
        type: Sequelize.STRING,
    },

    hair_styling: {
        type: Sequelize.STRING,
    },
    manicure: {
        type: Sequelize.STRING,
    },
    pedicure: {
        type: Sequelize.INTEGER,
    },

    lash: {
        type: Sequelize.TEXT,
    },
    brows: {
        type: Sequelize.STRING,
    },

    micro: {
        type: Sequelize.STRING,
    },

    make_up: {
        type: Sequelize.TEXT,
    },
    brows: {
        type: Sequelize.STRING,
    },

    micro: {
        type: Sequelize.STRING,
    }
});

module.exports = Saloon;