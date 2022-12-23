const Saloon = require("../model/salon/salon.model");
const sequelize = require("../config/database.config");

exports.firstPage = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'service_type'],],
    });

    console.log(totalAC);
}