const sequelize = require("../config/database.config");
const Logistics = require("../model/logistics.model");

exports.getTotalOrders = async (req, res) => {
    return await Logistics.count({});;
}

exports.getTotalOrders = async (req, res) => {
    return await Logistics.count({
        attributes: [
            // specify an array where the first element is the SQL function and the second is the alias
            [Sequelize.fn('DISTINCT', Sequelize.col('country')) ,'country'],
    
            // specify any additional columns, e.g. country_code
            // 'country_code'
    
        ]
    });;
}