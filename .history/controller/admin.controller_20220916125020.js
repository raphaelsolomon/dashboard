exports.index = (req, res) => {

    const users = User.findAll({where: {trade: 'Commodity'}, include: [{
        model: Com
    }]});
    return res.status(200).render('../admin/index');
}