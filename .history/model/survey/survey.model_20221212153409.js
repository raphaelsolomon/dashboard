const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Survey = sequelize.define('surveys', {
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    date_of_birth: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    emp_status: {
        type: Sequelize.STRING,
    },
    emp_qualification: {
        type: Sequelize.STRING,
    },
    course_study: {
        type: Sequelize.STRING,
    },
    osh_qualifications: {
        type: Sequelize.STRING,
    },
    years_of_experiences: {
        type: Sequelize.STRING,
    },
    osh_field_of_expertise: {
        type: Sequelize.STRING,
    },
    other_competent_field: {
        type: Sequelize.STRING,
    },
    core_skill: {
        type: Sequelize.STRING,
    },
});
module.exports = Survey;