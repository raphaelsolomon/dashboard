const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const GeneralInput = sequelize.define('generalinputs', {
    date: {
        type: Sequelize.DATEONLY,
    },
    man_hours: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    man_hours_remark: {
        type: Sequelize.STRING
    },

    toolbox_talk: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    toolbox_talk_remark: {
        type: Sequelize.TEXT,
    },

    no_of_hse_meeting: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    no_of_hse_meeting_remark: {
        type: Sequelize.STRING
    },

    no_of_hse_induction_training: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    no_of_hse_induction_training_remark: {
        type: Sequelize.STRING
    },

    no_of_permit_issue: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    no_of_permit_issue_remark: {
        type: Sequelize.STRING
    },

    no_of_uc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    no_of_uc_remark: {
        type: Sequelize.STRING
    },

    no_of_ua: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    no_of_ua_remark: {
        type: Sequelize.STRING
    },

    percent_of_ua_uc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    percent_of_ua_uc_remark: {
        type: Sequelize.STRING
    }
});

module.exports = GeneralInput;