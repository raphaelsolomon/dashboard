const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Task = sequelize.define('', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.TEXT,
    },
    message: {
        type: Sequelize.STRING
    },
    assign_to: {
        type: Sequelize.STRING,
    },
    due_date: {
        type: Sequelize.STRING,
    }
});

module.exports = Task;