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

            [sequelize.fn('SUM', sequelize.col('street_visited_adeojo')), 'adeojo'],
            [sequelize.fn('SUM', sequelize.col('street_visited_eleruwa')), 'eleruwa'],
            [sequelize.fn('SUM', sequelize.col('street_visited_olorunnimbe')), 'olorunnimbe'],
            [sequelize.fn('SUM', sequelize.col('street_visited_ojora')), 'ojora'],
            [sequelize.fn('SUM', sequelize.col('street_visited_eric_moore')), 'eric'],
        ],
        //where: {userId: req.user.id}
    });
    const pedTotal = Number.parseInt(getTotalPedestrian[0].ped1) + Number.parseInt(getTotalPedestrian[0].ped2) + Number.parseInt(getTotalPedestrian[0].ped3);
    const vehTotal = Number.parseInt(getTotalPedestrian[0].vehicle1) + Number.parseInt(getTotalPedestrian[0].vehicle2) + Number.parseInt(getTotalPedestrian[0].vehicle3) + Number.parseInt(getTotalPedestrian[0].vehicle4) + Number.parseInt(getTotalPedestrian[0].vehicle5);
    const visTotal = Number.parseInt(getTotalPedestrian[0].vehicle3) + Number.parseInt(getTotalPedestrian[0].ped2);
    const others = Number.parseInt(getTotalPedestrian[0].police) + Number.parseInt(getTotalPedestrian[0].man) + Number.parseInt(getTotalPedestrian[0].hospital);
    const staffTotals = Number.parseInt(getTotalPedestrian[0].vehicle2) + Number.parseInt(getTotalPedestrian[0].ped1);
    const resTotal = Number.parseInt(getTotalPedestrian[0].ped3);

    const hospital = Number.parseInt(getTotalPedestrian[0].hospital);
    const nfs = Number.parseInt(getTotalPedestrian[0].police);
    const man = Number.parseInt(getTotalPedestrian[0].man);

    const adeojo = Number.parseInt(getTotalPedestrian[0].adeojo);
    const eleruwa = Number.parseInt(getTotalPedestrian[0].eleruwa);
    const olorunnimbe = Number.parseInt(getTotalPedestrian[0].olorunnimbe);
    const ojora = Number.parseInt(getTotalPedestrian[0].ojora);
    const eric = Number.parseInt(getTotalPedestrian[0].eric);
    return { pedestrians: pedTotal, vehicles: vehTotal, visitors: visTotal, others: others, staffs: staffTotals, residents: resTotal, hospitals: hospital, npfs: nfs, man_center: man, adeojo: adeojo, eleruwa: eleruwa, olorunnimbe: olorunnimbe, ojora: ojora, eric: eric };
}

exports.chartPage = async (req, res) => {
    let map = {};
    const wemabods = await Wemabod.findAll({ raw: true, order: [['volume_of_plastics', 'DESC']] });
    wemabods.forEach(plastics => {
        if (map[plastics.date] === undefined) {
            map[plastics.date] = 10;
        } else {
            map[plastics.date] = map[plastics.initial_content] + 10;
        }
    });
    return { keys: Object.keys(map).join(', '), values: Object.values(map).join(', ') };
}