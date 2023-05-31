const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditFirstAid = sequelize.define('audit_first_aids', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    issued_first_aid_treatment: {
        type: Sequelize.TEXT,
    },
    other_first_aid_equipment: {
        type: Sequelize.TEXT
    },
    expired_item_first_aid_box: {
        type: Sequelize.TEXT,
    },
    sufficient_facility: {
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

module.exports = AuditFirstAid;