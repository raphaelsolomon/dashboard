const Commodity = require('./../model/commodity.model');
const sequelize = require("../config/database.config");

exports.getmostAdvertising = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    let commodity = [];

    commodity = await Commodity.findAll({
        where: { id: req.user.id },
        attributes: ['advertising_medium', [sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'total']],
        group: 'advertising_medium', order: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'DESC']]
    }) ;
    commodity.forEach((e) => {
       advertising_mediums.push(e.dataValues.advertising_medium);
       magnitudes.push(e.dataValues.total);
    })
    return {advertising_medium: JSON.stringify(advertising_mediums), magnitude: JSON.stringify(advertising_mediums)};
}