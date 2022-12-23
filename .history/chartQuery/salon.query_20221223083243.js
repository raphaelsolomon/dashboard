const Saloon = require("../model/salon/salon.model");

exports.firstPage = async (req, res) => {
    const getTotalPedestrian = await Saloon.findAll({
        raw: true,
        attributes: [
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_staff')), 'ped1'],]
    });
}