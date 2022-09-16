const sequelize = require("../config/database.config");
const Commodity = require("../model/commodity.model");
const User = require("../model/user.model");

exports.index = async (req, res) => {
    const newUsers = await sequelize.query(`SELECT * FROM users where createdAt BETWEEN '${2022-09-15 00:00:00' AND '2022-09-30 23:59:59'`);
    const users = await User.findAll({where: {trade: 'Commodity'}, include: [{
        model: Commodity
    }]});
    console.log(newUsers.length);

    return res.status(200).render('../admin/index', {users: users});
}