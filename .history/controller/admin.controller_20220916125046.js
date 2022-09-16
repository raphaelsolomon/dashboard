const Commodity = require("../model/commodity.model");
const User = require("../model/user.model");

exports.index = (req, res) => {

    const users = User.findAll({where: {trade: 'Commodity'}, include: [{
        model: Commodity
    }]});
    console.log(users);
    return res.status(200).render('../admin/index');
}