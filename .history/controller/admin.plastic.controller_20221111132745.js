const sequelize = require("../config/database.config");
const User = require("../model/user.model");
const { Op } = require('sequelize');
const Plastic = require("../model/plastic.model");

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
    const usersComplete = await User.findAll({
        where: { trade: 'Plastics' }, include: [{
            model: Commodity
        }]
    });
    const InActive = usersComplete.filter((e) => e.commodities.length <= 0);
    const Active = usersComplete.filter((e) => e.commodities.length > 0);

    const plastic = await Plastic.findAll({
        where: { trade: 'Plastics' }, include: [{
            model: Commodity
        }], limit: 7
    });

    return res.status(200).render('../admin/plastics/index', { users: users });
}

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
}