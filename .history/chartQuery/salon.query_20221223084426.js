const Saloon = require("../model/salon/salon.model");

exports.firstPage = async (req, res) => {
    const totalAC = await Saloon.findAll({
        raw: true,
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('SELECT
            COUNT(s.salon_name) AS `No of saloons`,
            s.service_type AS `Services offered`
        FROM
            dechcons_dashboard.saloons s
           GROUP BY
            (s.service_type)
        ORDER BY 
            COUNT(s.salon_name) DESC;')), 'ped1'],]
    });
}