const Saloon = require("../model/salon/salon.model");
const sequelize = require("../config/database.config");

//Presence of AC by number of saloons
exports.acByNumber = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'is_airconditioner'],
        group: 'is_airconditioner', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//opening and closing hours by number of saloons 
exports.openingClosing = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'opening_hours', 'closing_hours'],
        group: 'opening_hours', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//Services offered by number of saloons
exports.firstPage = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'service_type'],
        group: 'service_type', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
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

//Relaxer brands by number of saloons
exports.brandRelaxerUsed = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_relaxer_used'],
        group: 'brand_relaxer_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//Clipper brands by number of saloons
exports.brandClipperUsed = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_clipper_used'],
        group: 'brand_clipper_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//Brand of equipment used by number of saloons
exports.brandClipperUsed = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_equipment_used'],
        group: 'brand_equipment_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//AC brands by number of saloons
exports.isAirconditioner = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        where: { is_airconditioner: true },
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'make_air_condition', 'is_airconditioner'],
        group: 'make_air_condition', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//Officer in charge by number of saloons
exports.officeInCharge = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        where: { is_airconditioner: true },
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'officer'],
        group: 'officer', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//brand of extension used by number of saloons
exports.brandExtensionUsed = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_extension_used'],
        group: 'brand_extension_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}

//Brand of cream used by number of saloons
exports.brandCreamUsed = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_cream_used'],
        group: 'brand_cream_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    console.log(totalAC);
}