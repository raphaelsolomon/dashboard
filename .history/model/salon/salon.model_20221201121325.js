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
        type: Sequelize.STRING,
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
        defaultValue: 'off',
    },
    manicure: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    pedicure: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    lash: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    brows: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    micro: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    make_up: {
        type: Sequelize.TEXT,
        defaultValue: 'off',
    },
    spa: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    hair_cut: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    hair_lock: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    hair_cuts: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    all_of_the_above: {
        type: Sequelize.STRING,
        defaultValue: 'off',
    },
    //=======================================================================
    opening_hours: {
        type: Sequelize.STRING,
    },
    closing_hours: {
        type: Sequelize.STRING,
    },
    operational_days: {
        type: Sequelize.TEXT,
    },
    staff_numbers: {
        type: Sequelize.INTEGER,
    },
    brand_attachment_used: {
        type: Sequelize.STRING,
    },
    brand_weavon_used: {
        type: Sequelize.STRING,
    },
    brand_relaxer_used: {
        type: Sequelize.TEXT,
    },
    brand_clipper_used: {
        type: Sequelize.STRING,
    },
    brand_equipment_used: {
        type: Sequelize.STRING,
    },
    is_airconditioner: {
        type: Sequelize.BOOLEAN,
    },
    make_air_condition: {
        type: Sequelize.STRING,
    },
    horsepower_air_conditioner: {
        type: Sequelize.STRING,
    }
});

module.exports = Saloon;