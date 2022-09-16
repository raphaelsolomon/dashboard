exports.index = (req, res) => {

    const users = Users
    return res.status(200).render('../admin/index');
}