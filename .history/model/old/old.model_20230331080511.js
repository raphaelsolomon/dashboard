const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Older = sequelize.define('olders', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    address: {
        type: Sequelize.TEXT,
    },
    age_group: {
        type: Sequelize.STRING,
    },
    physical_activity: {
        type: Sequelize.STRING,
    },
    occupation: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    registered_nigerian: {
        type: Sequelize.STRING,
    },
    did_participate_in_preidential: {
        type: Sequelize.STRING,
    },
    supported_party: {
        type: Sequelize.STRING,
    },
    issues_in_election: {
        type: Sequelize.STRING,
    },
    rate_current_democracy: {
        type: Sequelize.STRING,
    },
    offered_money_for_voting: {
        type: Sequelize.STRING,
    },
    believe_in_free_and_fair: {
        type: Sequelize.STRING,
    },
    witness_electoral_malpratice: {
        type: Sequelize.STRING,
    },
    suggestion_for_free_and_fair: {
        type: Sequelize.STRING,
    },
    vote_countin_election: {
        type: Sequelize.STRING,
    },
   
});
module.exports = Older;