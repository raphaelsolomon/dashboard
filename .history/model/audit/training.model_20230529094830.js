const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditTraining = sequelize.define('auditTra', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name_lawma_contractor: {
        type: Sequelize.TEXT,
    },
    frequently_waste_picked: {
        type: Sequelize.TEXT
    },
    other_comment: {
        type: Sequelize.TEXT,
    },
    lawma_approved_contractor_picks_waste: {
        type: Sequelize.TEXT,
    },
    waste_segregation_practiced: {
        type: Sequelize.TEXT,
    },
    sight_waste_bins_around_premises: {
        type: Sequelize.TEXT,
    }
});

module.exports = AuditTraining;