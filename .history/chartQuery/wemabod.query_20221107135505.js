const Wemabod = require("../model/wembod.model")
const sequelize = require("../config/database.config");

exports.firstPage = async (req, res) => {
    const getTotalPedestrian = await Wemabod.findAll({
        raw: true,
        attributes: [
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_staff')), 'ped1'],
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_visitor')), 'ped2'],
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_resident')), 'total3'],

            [sequelize.fn('SUM', sequelize.col('movement_by_vehicle_resident')), 'vehicle1'],
        ],
        where: {}
    })
    return getTotalPedestrian;
}