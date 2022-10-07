const Commodity = require('./../model/commodity.model');
const sequelize = require("../config/database.config");

exports.getmostAdvertising = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    const commodity = await Commodity.findAll({
        where: { id: req.user.id },
        attributes: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'magnitude'], ['advertising_medium', 'advertising_medium']],
        group: 'advertising_medium', order: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'DESC']]
    });
    console.log(commodity[0].commodities)
    commodity.forEach(function (e) {
        advertising_mediums.push(e.advertising_medium);
        magnitudes.push(e.magnitude);
    });
    console.log ({advertising_medium: advertising_mediums, magnitude: magnitudes});
}