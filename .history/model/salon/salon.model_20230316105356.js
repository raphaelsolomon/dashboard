const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Saloon = sequelize.define('saloons', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
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
    salon_type: {
        type: Sequelize.STRING,
    },
    //=============================HAIR STYLING============================
    service_type: {
        type: Sequelize.TEXT,
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
        defaultValue: 1,
    },
    brand_extension_used: {
        type: Sequelize.STRING,
        defaultValue: "None"
    },
    brand_cream_used: {
        type: Sequelize.STRING,
        defaultValue: "None"
    },
    brand_relaxer_used: {
        type: Sequelize.TEXT,
        defaultValue: "None"
    },
    brand_clipper_used: {
        type: Sequelize.STRING,
    },
    brand_equipment_used: {
        type: Sequelize.STRING,
    },
    is_airconditioner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    business_fairing: {
        type: Sequelize.STRING
    },
    brand_air_condition: {
        type: Sequelize.STRING
    },
    brand_powder: {
        type: Sequelize.STRING
    },
    make_air_condition: {
        type: Sequelize.STRING,
    },
    horsepower_air_conditioner: {
        type: Sequelize.STRING,
    },
    officer: {
        type: Sequelize.STRING,
    }
});

module.exports = Saloon;