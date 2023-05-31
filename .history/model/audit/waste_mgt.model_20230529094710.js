const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const WasteMgt = sequelize.define('auditPaths', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name_lawma_contractor: {
        type: Sequelize.TEXT,
    },
    frequently_waste_picked: {
        type: Sequelize.TEXT
    },
    other_comment: {
        type: Sequelize.TEXT,
    },
    lawma_approved_contractor_picks_waste: {
        type: Sequelize.TEXT,
    },
    waste_segregation_practiced: {
        type: Sequelize.TEXT,
    },
    safety_signs: {
        type: Sequelize.TEXT,
    },
    workstations: {
        type: Sequelize.TEXT
    },
    toilets: {
        type: Sequelize.TEXT,
    },
    lighting: {
        type: Sequelize.TEXT,
    },
    muster_point: {
        type: Sequelize.TEXT,
    },
    hazard_spotted: {
        type: Sequelize.TEXT,
    },
    generator_area: {
        type: Sequelize.TEXT
    },
    front_of_the_bank: {
        type: Sequelize.TEXT,
    }
});

module.exports = WasteMgt;