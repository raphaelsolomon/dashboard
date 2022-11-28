const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const ExternalAudit = sequelize.define('externalaudits', {
    date: {
        type: Sequelize.DATE,
    },
    agency: {
        type: Sequelize.STRING,
    },
    comment: {
        type: Sequelize.TEXT,
    }
});

module.exports = ExternalAudit;