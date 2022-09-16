exports.index = (req, res) => {

    const users = Users.findAll({where: {}})
    return res.status(200).render('../admin/index');
}