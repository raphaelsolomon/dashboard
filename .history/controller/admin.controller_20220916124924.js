exports.index = (req, res) => {

    const users = Users.findAll({where: {trade: }})
    return res.status(200).render('../admin/index');
}