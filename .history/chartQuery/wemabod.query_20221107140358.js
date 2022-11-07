const Wemabod = require("../model/wembod.model")
const sequelize = require("../config/database.config");

exports.firstPage = async (req, res) => {
    const getTotalPedestrian = await Wemabod.findAll({
        raw: true,
        attributes: [
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_staff')), 'ped1'],
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_visitor')), 'ped2'],
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_resident')), 'ped3'],

            [sequelize.fn('SUM', sequelize.col('movement_by_vehicle_resident')), 'vehicle1'],
            [sequelize.fn('SUM', sequelize.col('movement_by_vehicle_staff')), 'vehicle2'],
            [sequelize.fn('SUM', sequelize.col('movement_by_vehicle_visitor')), 'vehicle3'],
            [sequelize.fn('SUM', sequelize.col('movement_by_vehicle_cab_service')), 'vehicle4'],
            [sequelize.fn('SUM', sequelize.col('movement_by_vehicle_delivery')), 'vehicle5'],
        ],
        where: {}
    });
    const pedTotal = Number.parseInt(getTotalPedestrian[0].ped1) + Number.parseInt(getTotalPedestrian[0].ped2) + Number.parseInt(getTotalPedestrian[0].ped3);
    return { pedestrians: pedTotal };
}