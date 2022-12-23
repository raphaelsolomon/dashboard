const Saloon = require("../model/salon/salon.model");

exports.firstPage = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('salon_name')), 'service_type'],]
    });
}