exports.index = (req, res) => {

    const users = Users.fin
    return res.status(200).render('../admin/index');
}