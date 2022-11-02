const Commodity = require('./../model/commodity.model');
const sequelize = require("../config/database.config");

exports.getmostAdvertising = async (req) => {
    const advertMedium = await sequelize.query(`SELECT advertising_medium, COUNT(*) AS magnitude FROM commodities WHERE userId=${req.user.id} GROUP BY advertising_medium ORDER BY magnitude DESC LIMIT 1`);
    console.log(advertMedium.length);
}