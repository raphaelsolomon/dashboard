const sequelize = require("../config/database.config");
const Commodity = require("../model/commodity.model");
const User = require("../model/user.model");
const { Op } = require('sequelize');

exports.index = async (req, res) => {
    const date = new Date();
    const fromDate = new Date(`${getPreviousDay().toISOString().substring(0, getPreviousDay().toISOString().indexOf('T'))} 00:00:00`);
    const toDate = new Date(`${date.toISOString().substring(0, date.toISOString().indexOf('T'))} 23:59:59`);
    const newUsers = await User.findAll({
        where: {
            createdAt: {
                [Op.between]: [
                   fromDate,
                   toDate
                ]
            }
        }
    })
    const users = await User.findAll({
        where: { trade: 'Commodity' }, include: [{
            model: Commodity
        }]
    });

    return res.status(200).render('../admin/index', { users: users, newUsers: newUsers.length });
}

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
}