const Sequelize = require('sequelize');
const sequelize = require('../configdatabase.config');

const Contractors_Mgt = sequelize.define('contractors', {
    date: {
        type: Sequelize.DATE,
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