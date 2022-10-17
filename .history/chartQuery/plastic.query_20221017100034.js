const sequelize = require("../config/database.config");
const Plastics = require("../model/plastic.model");

exports.getTotalWeight = async (req) => {
    let result = 0.0;
    const plastic = await req.user.getCommodities();
    plastic.forEach((e) => {
       
            let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
            result[`${e.dataValues.purchased_date}`] = result[`${e.dataValues.purchased_date}`] + profit;
        } else {
            let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
            result[`${e.dataValues.purchased_date}`] = profit;
        }
    });
    return result;
}