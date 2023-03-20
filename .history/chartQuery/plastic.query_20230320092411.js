const sequelize = require("../config/database.config");
const Crushing = require("../model/crush.model");
const Plastics = require("../model/plastic.model");

exports.getPlasticLimit = async (req) => {
    const limitPlastic = await req.user.getPlastics({
        limit: 7,
        order: [["createdAt", "DESC"]],
    });
    return limitPlastic;
}

exports.getTotalWeight = async (req) => {
    let result = 0;
    const plastic = await req.user.getPlastics();
    plastic.forEach((e) => {
        let size = Number.parseInt(`${e.dataValues.plastic_size}`.replace(/,/g, ''));
        if (e.dataValues.tonnage === 'ml')
            result = result + (size / 1000);
        else if (e.dataValues.tonnage === 'cl')
            result = result + (size / 100);
        else if (e.dataValues.tonnage === 'l')
            result = result + (size / 1);
        else if (e.dataValues.tonnage === 'g')
            result = result + (size / 1000);
    });
    return result.toFixed(2);
}

exports.getTotalBottles = async (req) => {
    let result = 0;
    const plastic = await req.user.getPlastics();
    plastic.forEach((e) => {
        let profit = Number.parseInt(`${e.dataValues.volume_of_plastics}`.replace(/,/g, ''));
        result = result + profit;
    });
    return result;
}

exports.getTotalZone = async (req) => {
    const plastics = await req.user.getPlastics({
        attributes: ['zone', [sequelize.fn('COUNT', sequelize.col('zone')), 'total']],
        group: 'zone', order: [[sequelize.fn('COUNT', sequelize.col('zone')), 'DESC']]
    });
    return plastics.length;
}

exports.getTotalProducts = async (req) => {
    const plastics = await req.user.getPlastics({
        attributes: ['product', [sequelize.fn('COUNT', sequelize.col('product')), 'total']],
        group: 'product', order: [[sequelize.fn('COUNT', sequelize.col('product')), 'DESC']]
    });
    return plastics.length;
}

//================================================================================================

exports.getIntialVolumeOfPlastics = async (req) => { }

//==============================DONE==================================
exports.getTotalOfPlasticByManufactures = async (req) => {
    const plastics = await req.user.getPlastics({
        attributes: ['manufacturer', [sequelize.fn('COUNT', sequelize.col('manufacturer')), 'total']],
        limit: 5,
        group: 'manufacturer', order: [[sequelize.fn('COUNT', sequelize.col('manufacturer')), 'DESC']]
    });

    return plastics;
}

//================================DONE================================
exports.getPlasticsByZones = async (req) => {
    let products = [];
    let magnitudes = [];
    const plastics = await req.user.getPlastics({
        attributes: ['zone', [sequelize.fn('COUNT', sequelize.col('zone')), 'total']],
        group: 'zone', order: [[sequelize.fn('COUNT', sequelize.col('zone')), 'DESC']]
    });

    plastics.forEach((e) => {
        products.push(e.dataValues.zone);
        magnitudes.push(e.dataValues.total);
    })
    return { product: products.join(', '), magnitude: magnitudes.join(', ') };
}

//==============================DONE========================================

exports.getCollectedPlasticsByMonths = async (req) => {
    const result = {};
    const plastics = await req.user.getPlastics({
        attributes: ['date', [sequelize.fn('COUNT', sequelize.col('date')), 'total']],
        group: 'date', order: [[sequelize.fn('COUNT', sequelize.col('date')), 'DESC']]
    });
    plastics.forEach((data) => {
        if (result[data.dataValues.date] === undefined) {
            result[data.dataValues.date] = data.dataValues.total;
        } else {
            result[data.dataValues.date] = result[data.dataValues.date] + data.dataValues.total;
        }
    })

    return { keys: Object.keys(result).join(', '), values: Object.values(result).join(', ') };
}
//=============================DONE============================ 
exports.getVolumeOfPlastics = async (req) => {
    const plastics = await req.user.getPlastics({
        attributes: ['product', [sequelize.fn('COUNT', sequelize.col('volume_of_plastics')), 'total']],
        limit: 5,
        group: 'product', order: [[sequelize.fn('COUNT', sequelize.col('volume_of_plastics')), 'DESC']]
    });
    return plastics;
}

exports.getVolumeOfPlasticsWithTonnage = async (req) => {
    let map = {};
    const plastic = await req.user.getPlastics({ raw: true, limit: 7 });
    plastic.forEach(plastics => {
        if (map[`${plastics.plastic_size} ${plastics.tonnage}`] === undefined) {
            map[`${plastics.plastic_size} ${plastics.tonnage}`] = Number.parseInt(plastics.volume_of_plastics);
        } else {
            map[`${plastics.plastic_size} ${plastics.tonnage}`] = map[`${plastics.plastic_size} ${plastics.tonnage}`] + Number.parseInt(plastics.volume_of_plastics);
        }
    });
    return map;
}

exports.initialContentByVolumn = async (req) => {
    let map = {};
    const plastic = await req.user.getPlastics({ raw: true, order: [['volume_of_plastics', 'DESC']] });
    plastic.forEach(plastics => {
        if (map[plastics.initial_content] === undefined) {
            map[plastics.initial_content] = Number.parseInt(plastics.volume_of_plastics);
        } else {
            map[plastics.initial_content] = map[plastics.initial_content] + Number.parseInt(plastics.volume_of_plastics);
        }
    });
    return { keys: Object.keys(map).join(', '), values: Object.values(map).join(', ') };
}

exports.getTotalCrushWeight = async (req, res) => {

    const weight = await Crushing.findAll();
    const total = weight.map((e) => {
        total = total + Number.parseInt(`${e.qty}`);
        return total;
    })
}