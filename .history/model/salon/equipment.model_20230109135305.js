const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Clipper = sequelize.define('clippers', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});
module.exports = Clipper;