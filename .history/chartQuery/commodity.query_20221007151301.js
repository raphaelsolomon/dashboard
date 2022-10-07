const Commodity = require('./../model/commodity.model');
const sequelize = require("../config/database.config");

exports.getmostAdvertising = async (req) => {
    const commodity = await Commodity.findAll({
        where: { id: req.user.id },
        attributes: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'magnitude'], ['advertising_medium', 'advertising_medium']],
        group: 'advertising_medium', order: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'DESC']]
    });
    return commodity;
}