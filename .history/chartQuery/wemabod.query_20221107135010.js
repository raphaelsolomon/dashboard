const Wemabod = require("../model/wembod.model")
const sequelize = require("../config/database.config");

exports.firstPage = async (req, res) => {
    const getTotalPedestrian = await Wemabod.findAll({
        raw: true,
        attributes: [
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_staff')), 'total'],
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_visitor')), 'total'],
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_resident')), 'totales']
        ],
        where: {}
    })
    return getTotalPedestrian;
}