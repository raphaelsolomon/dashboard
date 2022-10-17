const sequelize = require("../config/database.config");
const Plastics = require("../model/plastic.model");

exports.getPlasticLimit = async (req) => {
    const limitPlastic = await req.user.getPlastics({
        limit: 7,
        order: [["createdAt", "DESC"]],
      });
      return limitPlastic;
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
    console.log(result);
    return result;
}

exports.getTotalBottles = async (req) => {
    let result = 0;
    const plastic = await req.user.getPlastics();
    plastic.forEach((e) => {
        let profit = Number.parseInt(`${e.dataValues.volume_of_plastics}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.volume_of_plastics}`.replace(/,/g, ''));
        result = result + profit;
    });
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