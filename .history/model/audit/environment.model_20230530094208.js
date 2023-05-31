const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditFirePrecautions = sequelize.define('audit_fire_precautions', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    state: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT
    },
});

const AuditStairCases = sequelize.define('audit_stairs_staircases', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    are_all_guardrails_present: {
        type: Sequelize.TEXT,
    },
    did_you_sight_any_faulty_guardrails: {
        type: Sequelize.TEXT,
    },
    did_you_sight_any_faulty_guardrails_where: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT
    },
   
});

const AuditSafetySigns = sequelize.define('audit_safety_signs', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    installed_in_strategic_locations: {
        type: Sequelize.TEXT,
    },
    signs_in_their_right_color_code: {
        type: Sequelize.TEXT,
    },
    are_there_any_sign_faded: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT
    },
});

const AuditTemperatures = sequelize.define('audit_temperatures', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    temp_well_regulated: {
        type: Sequelize.TEXT,
    },
    expose_to_extreme_cold: {
        type: Sequelize.TEXT,
    },
    expose_to_extreme_cold_where: {
        type: Sequelize.TEXT,
    },
    expose_to_extreme_heat: {
        type: Sequelize.TEXT,
    },
    expose_to_extreme_heat_where: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT
    },
});

const AuditTemperatures = sequelize.define('audit_temperatures', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    temp_well_regulated: {
        type: Sequelize.TEXT,
    },
    expose_to_extreme_cold: {
        type: Sequelize.TEXT,
    },
    expose_to_extreme_cold_where: {
        type: Sequelize.TEXT,
    },
    expose_to_extreme_heat: {
        type: Sequelize.TEXT,
    },
    expose_to_extreme_heat_where: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT
    },
});

module.exports = {AuditFirePrecautions, AuditStairCases, AuditSafetySigns, AuditTemperatures};