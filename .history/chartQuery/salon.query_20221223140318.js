const Saloon = require("../model/salon/salon.model");
const sequelize = require("../config/database.config");

//Presence of AC by number of saloons
exports.acByNumber = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'is_airconditioner'],
        group: 'is_airconditioner', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    return totalAC;
}

//opening and closing hours by number of saloons 
exports.openingClosing = async (req, res) => {
    const total = [];
    const time = [];
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'opening_hours',],
        group: 'opening_hours', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    totalAC.forEach((e) => {
        time.push(`${e.opening_hours}-${e.closing_hours}`)
        total.push(e.total)
    });
    return { total: total.join(', '), time: time.join(', ') }
}

//Services offered by number of saloons
exports.firstPage = async (req, res) => {
    const total = [];
    const service_type = [];
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'service_type'],
        group: 'service_type', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });
    totalAC.forEach((e) => {
        service_type.push(e.service_type)
        total.push(e.total)
    });
    return { total: total.join(', '), service_type: service_type.join(', ') }
}

//Operational days by number of saloons
exports.operationalDays = async (req, res) => {
    const total = [];
    const days = [];
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'operational_days'],
        group: 'operational_days', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    totalAC.forEach((e) => {
        days.push(e.operational_days)
        total.push(e.total)
    });
    return { total: total.join(', '), days: days.join(', ') }
}

//Number of staff by number of saloons
exports.staffNumbers = async (req, res) => {
    const total = [];
    const staffNum = [];
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'staff_numbers'],
        group: 'staff_numbers', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    totalAC.forEach((e) => {
        staffNum.push(Number.parseInt(e.staff_numbers))
        total.push(Number.parseInt(e.total))
    });

    return { total: total.join(', '), staffNum: staffNum.join(', ') }
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
    const total = [];
    const clippers = [];
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_clipper_used'],
        group: 'brand_clipper_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    totalAC.forEach((e) => {
        clippers.push(e.brand_clipper_used)
        total.push(e.total)
    });
    return { total: total.join(', '), clippers: clippers.join(', ') }
}

//Brand of equipment used by number of saloons =======================================
exports.brandEquipmentUsed = async (req, res) => {
    const total = [];
    const equipment = [];
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_equipment_used'],
        group: 'brand_equipment_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    totalAC.forEach((e) => {
        equipment.push(e.brand_equipment_used)
        total.push(e.total)
    });
    return { total: total.join(', '), equipment: equipment.join(', ') }
}

//AC brands by number of saloons ==========================================
exports.isAirconditioner = async (req, res) => {
    const total = [];
    const airConditioner = [];
    const totalAC = await Saloon.findAll({
        raw: true,
        where: { is_airconditioner: true },
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'make_air_condition'],
        group: 'make_air_condition', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    totalAC.forEach((e) => {
        airConditioner.push(e.make_air_condition)
        total.push(e.total)
    });
    return { total: total.join(', '), airConditioner: airConditioner.join(', ') }
}

//Officer in charge by number of saloons ================================
exports.officeInCharge = async (req, res) => {
    const total = [];
    const officer = [];
    const totalAC = await Saloon.findAll({
        raw: true,
        where: { is_airconditioner: true },
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'officer'],
        group: 'officer', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    totalAC.forEach((e) => {
        officer.push(e.officer)
        total.push(e.total)
    });
    return { total: total.join(', '), officer: officer.join(', ') }
}

//brand of extension used by number of saloons ============================
exports.brandExtensionUsed = async (req, res) => {
    const total = [];
    const extension = [];

    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_extension_used'],
        group: 'brand_extension_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    totalAC.forEach((e) => {
        extension.push(e.brand_extension_used)
        total.push(e.total)
    });
    return { total: total.join(', '), extension: extension.join(', ') }
}

//Brand of cream used by number of saloons ============================
exports.brandCreamUsed = async (req, res) => {
    const total = [];
    const cream = [];

    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'total'], 'brand_cream_used'],
        group: 'brand_cream_used', order: [[sequelize.fn('COUNT', sequelize.col('salon_name')), 'DESC']]
    });

    totalAC.forEach((e) => {
        cream.push(e.brand_cream_used)
        total.push(e.total)
    });
    return { total: total.join(', '), cream: cream.join(', ') }
}