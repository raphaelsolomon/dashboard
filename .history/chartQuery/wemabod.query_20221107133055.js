exports.firstPage = async (req, res) => {
    const getTotalPedestrian = await ({
        raw: true,
        attributes: [[sequelize.cast(sequelize.fn('SUM', sequelize.col('movement_by_ped_staff')), 'int'), 'movement_by_ped_staff']],
        where: {}
    })
}