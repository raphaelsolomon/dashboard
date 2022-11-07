const Wemabod = require("../model/wembod.model")
const 

exports.firstPage = async (req, res) => {
    const getTotalPedestrian = await Wemabod.findAll({
        raw: true,
        attributes: [[sequelize.cast(sequelize.fn('SUM', sequelize.col('movement_by_ped_staff')), 'int'), 'movement_by_ped_staff']],
        where: {}
    })
    return getTotalPedestrian;
}