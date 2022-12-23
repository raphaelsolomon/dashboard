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

//Number of staff by number of saloons
exports.staffNumbers = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'staff_numbers'],
        group: 'staff_numbers', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//Number of staff by number of saloons
exports.brandRelaxer = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_relaxer_used'],
        group: 'brand_relaxer_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}