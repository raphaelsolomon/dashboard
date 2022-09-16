exports.index = (req, res) => {

    const users = Users.findAll({})
    return res.status(200).render('../admin/index');
}