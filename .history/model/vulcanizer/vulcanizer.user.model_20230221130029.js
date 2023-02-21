const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Vulcanizer_users = sequelize.define('vulcanizer_users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.TEXT,
    },
    age_group: {
        type: Sequelize.STRING,
    },
    education: {
        type: Sequelize.STRING,
    },
    occupation: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    //==================================================================
    tires_repaires_or_replaced: {
        type: Sequelize.STRING,
    },
    vehicle_typically_repaired: {
        type: Sequelize.STRING,
    },
    find_current_vulcanizer: {
        type: Sequelize.STRING,
    },

    safactory: {
        type: Sequelize.STRING,
    },
    typical_turnaround_time: {
        type: Sequelize.TEXT,
    },
    sell_used_old_tires: {
        type: Sequelize.STRING,
    },
    deal_difficult_customer: {
        type: Sequelize.STRING,
    },
    customer_safety: {
        type: Sequelize.STRING,
    },
    new_tire_tech_and_repair_technique: {
        type: Sequelize.STRING,
    },

    safety_gear: {
        type: Sequelize.STRING,
    },
    safety_training: {
        type: Sequelize.STRING,
    },
    fire_extinguisher: {
        type: Sequelize.STRING,
    },
    first_aid_kit: {
        type: Sequelize.STRING,
    },
    proper_ventilation_system: {
        type: Sequelize.TEXT,
    },
    condition_of_tire_before_working: {
        type: Sequelize.STRING,
    },
    inspect_equipment: {
        type: Sequelize.STRING,
    },
    use_torque_wrench: {
        type: Sequelize.STRING,
    },
    experienced_accident_while_working: {
        type: Sequelize.STRING,
    },
    better_safety_regulations: {
        type: Sequelize.STRING
    }
});
module.exports = Vulcanizer_users;