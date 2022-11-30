const express = require("express");
const Contractors_Mgt = require("../../model/hse/contractor.model");
const ExternalAudit = require("../../model/hse/external_audit.model");
const GeneralInput = require("../../model/hse/general_input.model");
const HSE_INSPECTION = require("../../model/hse/hse_inspection.model");
const HSE_ONDUTY = require("../../model/hse/hse_onduty.model");
const ORTHER_HSE = require("../../model/hse/other_hse.model");
const IncidentOverview = require("../../model/hse/overview.model");
const Water_And_Oil = require("../../model/hse/water.model");
const { isAuthenticated } = require("../../utils/helper.util");
const route = express.Router();

route.get('/general', isAuthenticated, async (req, res) => {
    const generalCount = await GeneralInput.findAll({});
    return res.status(200).render('../tables/general_table', { generalCount: generalCount });
});

route.get('/overview', isAuthenticated, async (req, res) => {
    const overviews = await IncidentOverview.findAll({});
    return res.status(200).render('../tables/incident_overview_table', { overview: overviews });
});

route.get('/hse_inspection', isAuthenticated, async (req, res) => {
    const inspections = await HSE_INSPECTION.findAll({});
    return res.status(200).render('../tables/hse_inpsection_report_table', { inspection: inspections });
});

route.get('/contractor', isAuthenticated, async (req, res) => {
    const contractors = await Contractors_Mgt.findAll({});
    return res.status(200).render('../tables/contractor_management_table', { contractor: contractors });
});

route.get('/external', isAuthenticated, async (req, res) => {
    const externals = await ExternalAudit.findAll({});
    return res.status(200).render('../tables/external_audit_inspection_table', { external: externals });
});

route.get('/hse_onduty', isAuthenticated, async (req, res) => {
    const onDuty = await HSE_ONDUTY.findAll({});
    return res.status(200).render('../tables/hse_personnel_onduty_table', { onduty: onDuty });
});

route.get('/others', isAuthenticated, async (req, res) => {
    const others = await ORTHER_HSE.findAll({});
    return res.status(200).render('../tables/other_hse_activities_table', { other: others });
});

route.get('/water_and_oil', isAuthenticated, async (req, res) => {
    const water = await Water_And_Oil.findAll({});
    return res.status(200).render('../tables/water_and_oil_record_table', { water: water });
});

//=========================================DELETE===========================================

route.get('/general/:id/', isAuthenticated, async (req, res) => {
    return GeneralInput.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/admin/hse/table/general');
    });
})

route.get('/overview/:id/', isAuthenticated, async (req, res) => {
    return IncidentOverview.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/admin/hse/table/overview');
    });
})

route.get('/hse_inspection/:id/', isAuthenticated, async (req, res) => {
    return HSE_INSPECTION.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/admin/hse/table/hse_inspection');
    });
})

route.get('/external/:id/', isAuthenticated, async (req, res) => {
    return GeneralInput.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/admin/hse/table/general');
    });
})

route.get('/contractor/:id/', isAuthenticated, async (req, res) => {
    return Contractors_Mgt.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/admin/hse/table/contractor');
    });
})

route.get('/hse_onduty/:id/', isAuthenticated, async (req, res) => {
    return GeneralInput.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/admin/hse/table/hse_onduty');
    });
})

route.get('/others/:id/', isAuthenticated, async (req, res) => {
    return GeneralInput.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/admin/hse/table/others');
    });
})

route.get('/water_and_oil/:id/', isAuthenticated, async (req, res) => {
    return GeneralInput.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/admin/hse/table/water_and_oil');
    });
})

module.exports = route;