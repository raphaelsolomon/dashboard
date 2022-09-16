const User = require("../model/user.model");

exports.index = (req, res) => {

    const users = User.findAll({where: {trade: 'Commodity'}, include: [{
        model: Commo
    }]});
    return res.status(200).render('../admin/index');
}