const sequelize = require("../config/database.config");
const Commodity = require("../model/commodity.model");
const User = require("../model/user.model");

exports.index = async (req, res) => {
    const newUsers = await sequelize.query(`SELECT * FROM users where createdAt BETWEEN '${getPreviousDay(d).toISOString().substring(0, getPreviousDay().toISOString().indexOf('T'))} 00:00:00' AND '${2022-09-30} 23:59:59'`);
    const users = await User.findAll({where: {trade: 'Commodity'}, include: [{
        model: Commodity
    }]});
    console.log(newUsers.length);

    return res.status(200).render('../admin/index', {users: users});
}

function getPreviousDay(date = new Date(), number) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - number);
  
    return previous;
  }