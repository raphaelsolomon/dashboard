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
    sight_any_trailing_cables: {
        type: Sequelize.TEXT,
    },
    sight_any_exposed_naked_wires: {
        type: Sequelize.TEXT,
    },
    faulty_sockets_switches: {
        type: Sequelize.TEXT,
    },
    fire_risk_assessment: {
        type: Sequelize.TEXT
    },
    procedure_monitoring_electrical_appliances: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

module.exports = AuditFirstSafety;