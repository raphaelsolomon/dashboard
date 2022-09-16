const sequelize = require("../config/database.config");
const Commodity = require("../model/commodity.model");
const User = require("../model/user.model");

exports.index = async (req, res) => {
    const date = new Date();
    const newUsers = await User.findAll({ where: { createdAt: { : [
        `${getPreviousDay().toISOString().substring(0, getPreviousDay().toISOString().indexOf('T'))} 00:00:00`,
        `${date.toISOString().substring(0, date.toISOString().indexOf('T'))} 23:59:59`
    ] } } })
    const users = await User.findAll({
        where: { trade: 'Commodity' }, include: [{
            model: Commodity
        }]
    });
    console.log(newUsers);

    return res.status(200).render('../admin/index', { users: users });
}

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
}