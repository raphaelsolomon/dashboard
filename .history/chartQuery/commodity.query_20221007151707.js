const Commodity = require('./../model/commodity.model');
const sequelize = require("../config/database.config");

exports.getmostAdvertising = async (req) => {
    let advertising_medium = [];
    let magnitude = [];
    const commodity = await Commodity.findAll({
        where: { id: req.user.id },
        attributes: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'magnitude'], ['advertising_medium', 'advertising_medium']],
        group: 'advertising_medium', order: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'DESC']]
    });
    commodity.forEach(function (medium) {
        advertising_medium.push(medium.advertising_medium);
        magnitude.push(medium.magnitude);
    });
    return {advertising_medium};
}