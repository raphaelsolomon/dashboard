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

const AuditAccessExits = sequelize.define('audit_access_exits', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    access_door_free_from_obs: {
        type: Sequelize.TEXT,
    },
    exit_door_free_from_obs: {
        type: Sequelize.TEXT,
    },
    are_safety_sign_placed_at_access_door: {
        type: Sequelize.TEXT,
    },
    are_safety_sign_placed_at_exit_door: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT
    },
});

const AuditGangWays = sequelize.define('audit_gangways', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    are_gang_way_free_from_obs: {
        type: Sequelize.TEXT,
    }, are_gang_way_free_from_obs_where: {
        type: Sequelize.TEXT,
    },
    are_gang_way_properly_lit: {
        type: Sequelize.TEXT,
    },
    are_gang_way_properly_lit_where: {
        type: Sequelize.TEXT,
    },
    wide_enough_to_accomodate_flow_of_humans: {
        type: Sequelize.TEXT,
    },
    wide_enough_to_accomodate_flow_of_humans_where: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT
    },
});

module.exports = { AuditFirePrecautions, AuditStairCases, AuditSafetySigns, AuditTemperatures, AuditAccessExits };