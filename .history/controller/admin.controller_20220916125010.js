exports.index = (req, res) => {

    const users = Users.findAll({where: {trade: 'Commodity'}, include: [{
        model
    }]});
    return res.status(200).render('../admin/index');
}