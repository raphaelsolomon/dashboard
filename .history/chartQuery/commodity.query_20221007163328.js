const Commodity = require('./../model/commodity.model');
const sequelize = require("../config/database.config");

exports.getmostAdvertising = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    let commodity = [];

    commodity = await Commodity.findAll({
        attributes: ['advertising_medium', [sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'total']],
        group: 'advertising_medium', order: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'DESC']]
    }) ;
    console.log(commodity.length)
    commodity.forEach((e) => {
       advertising_mediums.push(e.dataValues.advertising_medium);
       magnitudes.push(e.dataValues.total);
    })
    return {advertising_medium: advertising_mediums.join(', '), magnitude: magnitudes.join(', ')};
}


exports.getmostDeliveryLocation = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    let commodity = [];

    commodity = await Commodity.findAll({
        attributes: ['delivery_location', [sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'total']],
        group: 'advertising_medium', order: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'DESC']]
    }) ;
    console.log(commodity.length)
    commodity.forEach((e) => {
       advertising_mediums.push(e.dataValues.advertising_medium);
       magnitudes.push(e.dataValues.total);
    })
    return {advertising_medium: advertising_mediums.join(', '), magnitude: magnitudes.join(', ')};
}