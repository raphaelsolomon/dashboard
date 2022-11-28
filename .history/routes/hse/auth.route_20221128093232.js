const express = require("express");
const passport = require("passport");
const route = express.Router();
const { isAuthenticated } = require("../../utils/helper.util");
const GeneralInput = require("../../model/hse/general_input.model");
const IncidentOverview = require("../../model/hse/overview.model");
const HSE_INSPECTION = require("../../model/hse/hse_inspection.model");
const Contractors_Mgt = require("../../model/hse/contractor.model");


route.get('/', isAuthenticated, async (req, res, next) => {
    return res.status(200).redirect('/home');
})

route.get('/home', isAuthenticated, async (req, res, next) => {
    const generalCount = await GeneralInput.findAll({});
    const overview = await IncidentOverview.count({});
    const hse_inspection = await HSE_INSPECTION.count({});
    const contractorCount = await Contractors_Mgt.count({});
    return res.status(200).render('..//hse/index', { generalCount: generalCount, overview: overview, hse_inspection: hse_inspection, contractorCount: contractorCount });
})

module.exports = route;