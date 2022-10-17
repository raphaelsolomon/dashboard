const sequelize = require("../config/database.config");
const Plastics = require("../model/plastic.model");

exports.getPlasticLimit = async (req) => {
    const limitPlastic = await req.user.getPlastics({
        limit: 7,
        order: [["createdAt", "DESC"]],
      });
      retune
}

exports.getTotalWeight = async (req) => {
    let result = 0;
    const plastic = await req.user.getPlastics();
    plastic.forEach((e) => {
        let size = Number.parseInt(`${e.dataValues.plastic_size}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.plastic_size}`.replace(/,/g, ''));
        if (e.dataValues.tonnage === 'ml')
            result = size / 1000;
        else if (e.dataValues.tonnage === 'cl')
            result = size / 100;
        else if (e.dataValues.tonnage === 'l')
            result = size / 1;
        else if (e.dataValues.tonnage === 'g')
            result = size / 1000;
    });
    return result;
}

exports.getTotalBottles = async (req) => {
    let result = 0;
    // const plastic = await req.user.getCommodities();
    // plastic.forEach((e) => {
    //     let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
    //     result = result + profit;
    // });
    return result;
}

exports.getTotalZone = async (req) => {
    const plastics = await req.user.getPlastics({
        attributes: ['zone', [sequelize.fn('COUNT', sequelize.col('zone')), 'total']],
        group: 'zone', order: [[sequelize.fn('COUNT', sequelize.col('zone')), 'DESC']]
    });
    return plastics.length;
}

exports.getTotalProducts = async (req) => {
    const plastics = await req.user.getPlastics({
        attributes: ['product', [sequelize.fn('COUNT', sequelize.col('product')), 'total']],
        group: 'product', order: [[sequelize.fn('COUNT', sequelize.col('product')), 'DESC']]
    });
    return plastics.length;
}