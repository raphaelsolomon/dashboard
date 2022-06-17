const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

sequelize.define("sessions", {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
});

function extendDefaultFields(defaults, session) {
    return {
        data: defaults.data,
        expires: defaults.expires,
        userId: session.userId,
    };
}

module.exports = extendDefaultFields