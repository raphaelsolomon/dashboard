exports.firstPage = async (req, res) => {
    const getTotalPedestrian = await Wemabod.findAll({
        raw: true,
        attributes: [
            [sequelize.fn('SUM', sequelize.col('movement_by_ped_staff')), 'ped1'],]});
}