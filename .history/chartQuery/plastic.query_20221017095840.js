const sequelize = require("../config/database.config");
const Plastics = require("../model/plastic.model");

exports.getTotalWeight = async (req) => {
    let result = 0.0;
    const plas = await req.user.getCommodities({ limit: 7 });
    commodity.forEach((e) => {
        if (result[`${e.dataValues.purchased_date}`] !== undefined) {
            let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
            result[`${e.dataValues.purchased_date}`] = result[`${e.dataValues.purchased_date}`] + profit;
        } else {
            let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
            result[`${e.dataValues.purchased_date}`] = profit;
        }
    });
    return { keys: Object.keys(result).join(', '), values: Object.values(result).join(', ') };
}