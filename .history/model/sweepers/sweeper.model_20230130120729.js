const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Sweeper = sequelize.define('sweepers', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.TEXT,
    },
    age_group: {
        type: Sequelize.STRING,
    },
    education: {
        type: Sequelize.STRING,
    },
    income_status: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    ///===================SWEEPING EXP.=========================
    sweeping_experience: {
        type: Sequelize.STRING,
    },
    ///===================SWEEPING EXP.=========================
    respiratory_analysis: {
        type: Sequelize.STRING,
    },
    medical_insurance: {
        type: Sequelize.STRING,
    },
    insurance_cover: {
        type: Sequelize.STRING,
    },
    alcohol_consumption: {
        type: Sequelize.STRING,
    },
    cannabis_consuption: {
        type: Sequelize.STRING,
    },
    unprescribed_medication: {
        type: Sequelize.STRING,
    },
    safety_protective: {
        type: Sequelize.STRING,
    },
    trouble_breathing: {
        type: Sequelize.STRING,
    },
    panick_attack: {
        type: Sequelize.STRING,
    },
    blurred_eyesight: {
        type: Sequelize.STRING,
    },
    sleeping_problems: {
        type: Sequelize.STRING,
    },
    fatigue_exp: {
        type: Sequelize.STRING,
    },
    muscle_ache: {
        type: Sequelize.STRING,
    },
    chest_pain: {
        type: Sequelize.STRING,
    },
    trouble_eating: {
        type: Sequelize.STRING,
    }
});
module.exports = Sweeper;