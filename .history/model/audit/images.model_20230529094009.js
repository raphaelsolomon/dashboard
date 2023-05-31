const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const ImagePaths = sequelize.define('auditPaths', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    poor_house_keeping: {
        type: Sequelize.TEXT,
    },
    trailing_cable: {
        type: Sequelize.TEXT
    },
    fire_fighting_equipment: {
        type: Sequelize.STRING,
    },
    due_date: {
        type: Sequelize.STRING,
    },
    isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Task;