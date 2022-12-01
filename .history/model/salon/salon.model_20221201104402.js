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
    //=============================HAIR STYLING============================
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
    spa: {
        type: Sequelize.STRING,
    },
    hair_cut: {
        type: Sequelize.STRING,
    },
    hair_lock: {
        type: Sequelize.TEXT,
    },
    hair_cuts: {
        type: Sequelize.STRING,
    },

    all_of_the_above: {
        type: Sequelize.STRING,
    },
    //=======================================================================
    opening_hours: {
        type: Sequelize.STRING,
    },
    closing_hours: {
        type: Sequelize.STRING,
    },

});

module.exports = Saloon;