const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditFirstSafety = sequelize.define('auditFirsts', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    free_obstruction: {
        type: Sequelize.TEXT,
    },
    fire_extinguishers_hung_wall: {
        type: Sequelize.TEXT
    },
    other_fire_fighting_equipment_installed: {
        type: Sequelize.TEXT,
    },
    fire_service_certificate: {
        type: Sequelize.TEXT,
    },
    fire_equipment: {
        type: Sequelize.TEXT,
    },
    classes_fire_extinguishers: {
        type: Sequelize.TEXT
    },
    fire_extinguishers_present: {
        type: Sequelize.TEXT,
    },
    where_fire_extinguisher_obstructed: {
        type: Sequelize.TEXT,
    },
    where_placed_floor: {
        type: Sequelize.TEXT,
    },
    fire_extinguishers_serviced_last: {
        type: Sequelize.TEXT
    },
    expiring_date_fire_extinguishers: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

module.exports = AuditFirs;