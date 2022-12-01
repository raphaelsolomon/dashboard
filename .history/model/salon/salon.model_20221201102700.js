const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Saloon = sequelize.define('contractors', {
    date: {
        type: Sequelize.DATEONLY,
    },

    contractor_name: {
        type: Sequelize.STRING,
    },
    job_desc: {
        type: Sequelize.TEXT,
    },

    total_manhours: {
        type: Sequelize.STRING,
    },
    jobstatus: {
        type: Sequelize.STRING,
    },

    comment: {
        type: Sequelize.STRING,
    }
});

module.exports = Contractors_Mgt;