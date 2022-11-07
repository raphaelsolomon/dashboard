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

            [sequelize.fn('SUM', sequelize.col('police_matters_all_npf')), 'police'],
            [sequelize.fn('SUM', sequelize.col('man_matters')), 'man'],
            [sequelize.fn('SUM', sequelize.col('hospital_matters')), 'hospital'],
        ],
        where: {}
    });
    const pedTotal = Number.parseInt(getTotalPedestrian[0].ped1) + Number.parseInt(getTotalPedestrian[0].ped2) + Number.parseInt(getTotalPedestrian[0].ped3);
    const vehTotal = Number.parseInt(getTotalPedestrian[0].vehicle1) + Number.parseInt(getTotalPedestrian[0].vehicle2) + Number.parseInt(getTotalPedestrian[0].vehicle3) + Number.parseInt(getTotalPedestrian[0].vehicle4) + Number.parseInt(getTotalPedestrian[0].vehicle5);
    const visTotal = Number.parseInt(getTotalPedestrian[0].vehicle3) + Number.parseInt(getTotalPedestrian[0].ped2);
    const others = Number.parseInt(getTotalPedestrian[0].police) + Number.parseInt(getTotalPedestrian[0].man) + Number.parseInt(getTotalPedestrian[0].hospital);
    const staffTotals = Number.parseInt(getTotalPedestrian[0].vehicle2) + Number.parseInt(getTotalPedestrian[0].ped1) + Number.parseInt(getTotalPedestrian[0].hospital);
    return { pedestrians: pedTotal, vehicles: vehTotal, visitors: visTotal, others: others };
}