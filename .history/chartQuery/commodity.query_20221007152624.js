const Commodity = require('./../model/commodity.model');
const sequelize = require("../config/database.config");

exports.getmostAdvertising = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    const commodity = await Commodity.findAll({
        where: { id: req.user.id },
        attributes: ['advertising_medium', [sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'magnitude']],
        group: 'advertising_medium', order: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'DESC']]
    });
    console.log(commodity[0].magnitude)
    commodity.forEach(function (e) {  
        advertising_mediums.push(e.advertising_medium);
        magnitudes.push(e.magnitude);
    });
    console.log ({advertising_medium: advertising_mediums, magnitude: magnitudes});
}