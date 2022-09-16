const sequelize = require("../config/database.config");
const Commodity = require("../model/commodity.model");
const User = require("../model/user.model");

exports.index = async (req, res) => {
    const newUsers = await sequelize.query('SELECT * FROM users  WHERE id=(SELECT max(id) FROM users)');
    const users = await User.findAll({where: {trade: 'Commodity'}, include: [{
        model: Commodity
    }]});
    console.log(newUsers;

    return res.status(200).render('../admin/index', {users: users});
}