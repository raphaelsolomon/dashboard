const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const ImagePaths = sequelize.define('auditPaths', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    poor_house_keeping: {
        type: Sequelize.TEXT,
    },
    trailing_cable: {
        type: Sequelize.TEXT
    },
    fire_fighting_equipment: {
        type: Sequelize.TEXT,
    },
    waste_area: {
        type: Sequelize.TEXT,
    },
    stairs_and_staircase: {
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
    },
});

module.exports = Task;