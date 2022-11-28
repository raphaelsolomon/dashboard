const express = require("express");
const route = express.Router();
const Contractors_Mgt = require("../model/contractor.model");
const ExternalAudit = require("../model/external_audit.model");
const GeneralInput = require("../model/general_input.model");
const HSE_INSPECTION = require("../model/hse_inspection.model");
const HSE_ONDUTY = require("../model/hse_onduty.model");
const ORTHER_HSE = require("../model/other_hse.model");
const IncidentOverview = require("../model/overview.model");
const Water_And_Oil = require("../model/water.model");
const { isAuthenticated } = require("../utils/helper.util");

//============================GET METHOD=============================
route.get('/general', isAuthenticated, async (req, res, next) => {
  return res.status(200).render('../hse/inputs/general_input', { alert: [] });
})

route.get('/overview', isAuthenticated, async (req, res, next) => {
  return res.status(200).render('../hse/inputs/incident_overview_input', { alert: [] });
})

route.get('/hse_inspection', isAuthenticated, async (req, res, next) => {
  return res.status(200).render('../hse/inputs/hse_inpsection_report_input', { alert: [] });
})

route.get('/contractor', isAuthenticated, async (req, res, next) => {
  return res.status(200).render('../inputs/contractor_management_input', { alert: [] });
})

route.get('/external', isAuthenticated, async (req, res, next) => {
  return res.status(200).render('../hse/inputs/external_audit_inspection_input', { alert: [] });
})

route.get('/hse_onduty', isAuthenticated, async (req, res, next) => {
  return res.status(200).render('../hse/inputs/hse_personnel_onduty_input', { alert: [] });
})

route.get('/others', isAuthenticated, async (req, res, next) => {
  return res.status(200).render('../hse/inputs/other_hse_activities_input', { alert: [] });
})

route.get('/water_and_oil', isAuthenticated, async (req, res, next) => {
  return res.status(200).render('../hse/inputs/water_and_oil_record_input', { alert: [] });
})

//============================POST METHOD=============================
route.post('/general', isAuthenticated, async (req, res, next) => {
  if (req.body.date === undefined) {
    const msg = [];
    msg.push({ msg: `All fields are empty`, err: true });
    return res.status(200).render('../hse/inputs/general_input', { alert: msg });
  }

  return GeneralInput.create(req.body).then((input) => {
    const msg = [];
    msg.push({ msg: "Record Successfully inserted", err: false });
    return res.status(200).render('../hse/inputs/general_input', { alert: msg });
  }).catch((err) => {
    const msg = [];
    msg.push({ msg: `Unable to insert record ${err}`, err: true });
    return res.status(200).render('../hse/inputs/general_input', { alert: msg });
  });
})

route.post('/overview', isAuthenticated, async (req, res, next) => {
  if (req.body.date === undefined) {
    const msg = [];
    msg.push({ msg: `All fields are empty`, err: true });
    return res.status(200).render('../inputs/incident_overview_input', { alert: msg });
  }
  return IncidentOverview.create(req.body).then((input) => {
    const msg = [];
    msg.push({ msg: "Record Successfully inserted", err: false });
    return res.status(200).render('../hse/inputs/incident_overview_input', { alert: msg });
  }).catch((err) => {
    const msg = [];
    msg.push({ msg: `Unable to insert record ${err}`, err: true });
    return res.status(200).render('../hse/inputs/incident_overview_input', { alert: msg });
  });
})

route.post('/hse_inspection', isAuthenticated, async (req, res, next) => {
  if (req.body.date === undefined) {
    const msg = [];
    msg.push({ msg: `All fields are empty`, err: true });
    return res.status(200).render('../hse/inputs/hse_inpsection_report_input', { alert: msg });
  }
  return HSE_INSPECTION.create(req.body).then((input) => {
    const msg = [];
    msg.push({ msg: "Record Successfully inserted", err: false });
    return res.status(200).render('../hse/inputs/hse_inpsection_report_input', { alert: msg });
  }).catch((err) => {
    const msg = [];
    msg.push({ msg: `Unable to insert record ${err}`, err: true });
    return res.status(200).render('../hse/inputs/hse_inpsection_report_input', { alert: msg });
  });
})

route.post('/contractor', isAuthenticated, async (req, res, next) => {
  if (req.body.date === undefined) {
    const msg = [];
    msg.push({ msg: `All fields are empty`, err: true });
    return res.status(200).render('../hse/inputs/contractor_management_input', { alert: msg });
  }
  return Contractors_Mgt.create(req.body).then((input) => {
    const msg = [];
    msg.push({ msg: "Record Successfully inserted", err: false });
    return res.status(200).render('../hse/inputs/contractor_management_input', { alert: msg });
  }).catch((err) => {
    const msg = [];
    msg.push({ msg: `Unable to insert record ${err}`, err: true });
    return res.status(200).render('../hse/inputs/contractor_management_input', { alert: msg });
  });
})

route.post('/external', isAuthenticated, async (req, res, next) => {
  if (req.body.date === undefined) {
    const msg = [];
    msg.push({ msg: `All fields are empty`, err: true });
    return res.status(200).render('../hse/inputs/external_audit_inspection_input', { alert: msg });
  }
  return ExternalAudit.create(req.body).then((input) => {
    const msg = [];
    msg.push({ msg: "Record Successfully inserted", err: false });
    return res.status(200).render('../hse/inputs/external_audit_inspection_input', { alert: msg });
  }).catch((err) => {
    const msg = [];
    msg.push({ msg: `Unable to insert record ${err}`, err: true });
    return res.status(200).render('../hse/inputs/external_audit_inspection_input', { alert: msg });
  });
})

route.post('/hse_onduty', isAuthenticated, async (req, res, next) => {
  if (req.body.date === undefined) {
    const msg = [];
    msg.push({ msg: `All fields are empty`, err: true });
    return res.status(200).render('../hse/inputs/hse_personnel_onduty_input', { alert: msg });
  }
  return HSE_ONDUTY.create(req.body).then((input) => {
    const msg = [];
    msg.push({ msg: "Record Successfully inserted", err: false });
    return res.status(200).render('../hse/inputs/hse_personnel_onduty_input', { alert: msg });
  }).catch((err) => {
    const msg = [];
    msg.push({ msg: `Unable to insert record ${err}`, err: true });
    return res.status(200).render('../hse/inputs/hse_personnel_onduty_input', { alert: msg });
  });
})

route.post('/others', isAuthenticated, async (req, res, next) => {
  if (req.body.date === undefined) {
    const msg = [];
    msg.push({ msg: `All fields are empty`, err: true });
    return res.status(200).render('../inputs/other_hse_activities_input', { alert: msg });
  }
  return ORTHER_HSE.create(req.body).then((input) => {
    const msg = [];
    msg.push({ msg: "Record Successfully inserted", err: false });
    return res.status(200).render('../hse/inputs/other_hse_activities_input', { alert: msg });
  }).catch((err) => {
    const msg = [];
    msg.push({ msg: `Unable to insert record ${err}`, err: true });
    return res.status(200).render('../inputs/other_hse_activities_input', { alert: msg });
  });
})

route.post('/water_and_oil', isAuthenticated, async (req, res, next) => {
  if (req.body.date === undefined) {
    const msg = [];
    msg.push({ msg: `All fields are empty`, err: true });
    return res.status(200).render('../inputs/water_and_oil_record_input', { alert: msg });
  }
  return Water_And_Oil.create(req.body).then((input) => {
    const msg = [];
    msg.push({ msg: "Record Successfully inserted", err: false });
    return res.status(200).render('../inputs/water_and_oil_record_input', { alert: msg });
  }).catch((err) => {
    const msg = [];
    msg.push({ msg: `Unable to insert record ${err}`, err: true });
    return res.status(200).render('../inputs/water_and_oil_record_input', { alert: msg });
  });
})


module.exports = route;