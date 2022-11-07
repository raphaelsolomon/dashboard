exports.firstPage = async (req, res) => {
    const getTotalPedestrian = await req.user.getWemabods({
        raw: true,
        attributes: [[sequelize.cast(sequelize.fn('SUM', sequelize.col('moneycol')), 'int'), 'moneylabel']],
        where: {}
    })
}