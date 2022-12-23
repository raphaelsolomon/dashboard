const Saloon = require("../model/salon/salon.model");
const sequelize = require("../config/database.config");

//opening and closing hours by number of saloons 
exports.firstPage = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'opening_hours', 'closing_hours'],
        group: 'service_type', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}


//Services offered by number of saloons
exports.openingClosing = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'service_type'],
        group: 'opening_hours', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//Operational days by number of saloons
exports.operationalDays = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'operational_days'],
        group: 'operational_days', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

