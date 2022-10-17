const sequelize = require("../config/database.config");
const Plastics = require("../model/plastic.model");

exports.getTotalWeight = async (req) => {
    let result = 0;
    const plastic = await req.user.getPlastics();
    plastic.forEach((e) => {
        let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
        result = result + profit;
    });
    return result;
}

exports.getTotalBottles = async (req) => {
    let result = 0;
    const plastic = await req.user.getCommodities();
    plastic.forEach((e) => {
        let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
        result = result + profit;
    });
    return result;
}

exports.getTotalZone = async (req) => {
    const commodity = await req.user.getCommodities({
        attributes: ['mode_transaction', [sequelize.fn('COUNT', sequelize.col('mode_transaction')), 'total']],
        group: 'mode_transaction', order: [[sequelize.fn('COUNT', sequelize.col('mode_transaction')), 'DESC']]
    });
}

exports.getTotalProducts = async (req) => {
    let result = 0;
    const plastic = await req.user.getCommodities();
    plastic.forEach((e) => {
        let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
        result = result + profit;
    });
    return result;
}