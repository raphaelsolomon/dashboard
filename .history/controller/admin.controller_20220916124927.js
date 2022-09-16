exports.index = (req, res) => {

    const users = Users.findAll({where: {trade: 'Comm'}})
    return res.status(200).render('../admin/index');
}