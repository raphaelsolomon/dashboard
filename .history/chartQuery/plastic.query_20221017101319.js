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

exports.getTotalBottles = async (req) => {
    let result = 0;
    const plastic = await req.user.getCommodities();
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