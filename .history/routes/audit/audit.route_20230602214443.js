const express = require("express");
const { payloadAudit, isAuthenticated } = require("../../utils/helper.util");
const User = require("../../model/user.model");
const Audit_User = require("../../model/audit/audit_user.model");
const Task = require("../../model/audit/task.model");
const ImagePaths = require("../../model/audit/images.model");
const { AuditBankAudit, AuditWelFare, AuditControlSubstance, AuditEmergencyProceedure, AuditExecutiveSummary, AuditIncident, AuditLadder, AuditLiftOpt, AuditReportInjuries, AuditMgtReviews, AuditSafetyPolicy, AuditHandTools, AuditInsurance, AuditDisplayMonitor } = require("../../model/audit/lifting_opt.model");
const { AuditTraining, AuditSafetySystem, AuditCommunication, AuditContractorsMgt, AuditPermitWork } = require("../../model/audit/training.model");
const AuditElectricity = require("../../model/audit/electricity.model");
const AuditFirstAid = require("../../model/audit/first_aid.model");
const AuditFirstSafety = require("../../model/audit/first_safety.model");
const WasteMgt = require("../../model/audit/waste_mgt.model");
const { AuditTemperatures, AuditStairCases, AuditSafetySigns, AuditAccessExits, AuditFirePrecautions, AuditGangWays, AuditFloors, AuditLightenings, AuditHouseKeeping } = require("../../model/audit/environment.model");
const route = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


route.get('/', isAuthenticated, async (req, res) => {
    const bank_audit = await AuditBankAudit.findAll({ where: { userId: req.user.id } });
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    res.status(200).render('../audit/index', { alert: [], user: user, bank_audit: bank_audit });
});

route.get('/profile', isAuthenticated, async (req, res) => {
    const user = await User.findOne({
        where: { id: req.user.id }, include: [{
            model: Audit_User
        }, {
            model: Task
        }]
    });
    res.status(200).render('../audit/inputs/profile', { alert: [], user: user });
});

route.post('/profile', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    if (req.body.submit_type === 'user') {
        const { gender } = req.body;
        req.body.gender = gender == 'on' ? 'male' : 'female';
        return user.update(req.body).then((_) => res.status(200).redirect('/audit/profile'))
    } else {
        const audit_user = await Audit_User.findOne({ where: { userId: user.id } });
        if (audit_user) {
            return audit_user.update(req.body).then((_) => res.status(200).redirect('/audit/profile'));
        }
        req.body['userId'] = user.id;
        return Audit_User.create(req.body).then((result) => res.status(200).redirect('/audit/profile'));
    }
});
route.post('/task', isAuthenticated, async (req, res) => {
    const task = await req.user.createTask(req.body);
    res.status(200).json(task);
});
route.post('/upload', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) return res.status(400).json('error');
    user.avatar = req.body.path;
    user.save();
    return res.status(200).json('success');
});
route.get('/task/:id', isAuthenticated, async (req, res) => {
    const task = await Task.findOne({ where: { id: req.params.id } });
    if (task) {
        task.isCompleted = !task.isCompleted;
        return task.save().then((_) => res.status(200).json('success'));
    }
});
route.get('/introduction', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    res.status(200).render('../audit/inputs/introduction', { alert: [], user: user });
});

route.get('/introduction', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    res.status(200).render('../audit/inputs/introduction', { alert: [], user: user });
});
route.get('/section1', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    res.status(200).render('../audit/inputs/section1', { alert: [], user: user });
});

route.get('/section2', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    res.status(200).render('../audit/inputs/section2', { alert: [], user: user });
});

route.get('/section3', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    res.status(200).render('../audit/inputs/section3', { alert: [], user: user });
});

route.get('/section4', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    res.status(200).render('../audit/inputs/section4', { alert: [], user: user });
});

route.get('/section5', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    res.status(200).render('../audit/inputs/section5', { alert: [], user: user });
});

route.get('/section6', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    const data = payloadAudit(JS)
    res.status(200).render('../audit/inputs/section6', { alert: [], user: user });
});

route.post('/submission', isAuthenticated, async (req, res) => {
    const result = payloadAudit(req);
    console.log(result);
    // await ImagePaths.create(result.images);
    // await AuditBankAudit.create(result.bank_audit);
    // await AuditTraining.create(result.training);
    // await AuditSafetySystem.create(result.safe_system);
    // await AuditCommunication.create(result.communication);
    // await AuditContractorsMgt.create(result.contractors_management);
    // await AuditControlSubstance.create(result.control_substances);
    // await AuditElectricity.create(result.electricity);
    // await AuditEmergencyProceedure.create(result.emergency_procedure);
    // await AuditFirstAid.create(result.first_aid);
    // await AuditFirstSafety.create(result.first_safety);
    // await AuditIncident.create(result.incident_accident);
    // await AuditExecutiveSummary.create(result.executive_summary);
    // await AuditWelFare.create(result.welfare);
    // await AuditLadder.create(result.ladders);
    // await AuditLiftOpt.create(result.lifting_operations);
    // await AuditReportInjuries.create(result.reporting_injuries);
    // await AuditMgtReviews.create(result.management_review);
    // await AuditSafetyPolicy.create(result.safety_policy)
    // await AuditPermitWork.create(result.permit_work);
    // await AuditInsurance.create(result.insurance);
    // await WasteMgt.create(result.waste_management);
    // await AuditHandTools.create(result.handtools);
    // await AuditDisplayMonitor.create(result.display_monitor);
    // //===================ENVIRONMENT======================
    // await AuditTemperatures.create(result.temperature);
    // await AuditStairCases.create(result.stairs_staircases);
    // await AuditSafetySigns.create(result.safety_signs);
    // await AuditFirePrecautions.create(result.fire_precautions);
    // await AuditAccessExits.create(result.access_exit);

    // await AuditGangWays.create(result.gangways);
    // await AuditFloors.create(result.floors);
    // await AuditLightenings.create(result.lightening);
    // await AuditHouseKeeping.create(result.housekeeping)
    res.status(200).json('success');
});
route.get('/preview', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    res.status(200).render('../audit/inputs/preview', { alert: [], user: user });
});

//===============================TABLES======================
route.get('/table1', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    const mgtsReviews = await AuditMgtReviews.findAll({ where: { userId: req.user.id } });
    const insurance = await AuditInsurance.findAll({ where: { userId: req.user.id } });
    const auditSafetyPolic = await AuditSafetyPolicy.findAll({ where: { userId: req.user.id } });
    const emgProceedure = await AuditEmergencyProceedure.findAll({ where: { userId: req.user.id } });
    const wasteMgts = await WasteMgt.findAll({ where: { userId: req.user.id } });
    const incident = await AuditIncident.findAll({ where: { userId: req.user.id } });
    const training = await AuditTraining.findAll({ where: { userId: req.user.id } });
    const safe_system = await AuditSafetySystem.findAll({ where: { userId: req.user.id } });
    const permit_work = await AuditPermitWork.findAll({ where: { userId: req.user.id } });
    const communication = await AuditCommunication.findAll({ where: { userId: req.user.id } });
    const contractorsMgts = await AuditContractorsMgt.findAll({ where: { userId: req.user.id } });
    res.status(200).render('../audit/table/sectionTable1', {
        alert: [], mgtsReviews: mgtsReviews, insurance: insurance, emgProceedure: emgProceedure, auditSafetyPolic: auditSafetyPolic, incident: incident, wasteMgts: wasteMgts,
        training: training, safe_system: safe_system, permit_work: permit_work, communication: communication, contractorsMgts: contractorsMgts, user: user
    });
});

route.get('/table2', isAuthenticated, async (req, res) => {
    const user = await User.findOne({
        where: { id: req.user.id }, include: { model: Audit_User }
    });
    const injuries = await AuditReportInjuries.findAll({ where: { userId: req.user.id } });
    const first_aid = await AuditFirstAid.findAll({ where: { userId: req.user.id } });
    const first_safety = await AuditFirstSafety.findAll({ where: { userId: req.user.id } });
    const lifting = await AuditLiftOpt.findAll({ where: { userId: req.user.id } });
    const control_substances = await AuditControlSubstance.findAll({ where: { userId: req.user.id } });
    const electric = await AuditElectricity.findAll({ where: { userId: req.user.id } });
    const display_monitor = await AuditDisplayMonitor.findAll({ where: { userId: req.user.id } });
    res.status(200).render('../audit/table/sectionTable2', {
        alert: [], injuries: injuries, first_aid: first_aid, first_safety: first_safety, lifting: lifting,
        control_substances: control_substances, electric: electric, display_monitor: display_monitor, user: user
    });
});

route.get('/table3', isAuthenticated, async (req, res) => {
    const user = await User.findOne({
        where: { id: req.user.id }, include: { model: Audit_User }
    });
    const temperature = await AuditTemperatures.findAll({ where: { userId: req.user.id } });
    const fire_precautions = await AuditFirePrecautions.findAll({ where: { userId: req.user.id } });
    const access_exit = await AuditAccessExits.findAll({ where: { userId: req.user.id } });
    const safety_signs = await AuditSafetySigns.findAll({ where: { userId: req.user.id } });
    const stairs_staircases = await AuditStairCases.findAll({ where: { userId: req.user.id } });
    const gangways = await AuditGangWays.findAll({ where: { userId: req.user.id } });
    const floors = await AuditFloors.findAll({ where: { userId: req.user.id } });
    const lightening = await AuditLightenings.findAll({ where: { userId: req.user.id } });
    const housekeeping = await AuditHouseKeeping.findAll({ where: { userId: req.user.id } });

    res.status(200).render('../audit/table/sectionTable3', {
        alert: [], temperature: temperature, fire_precaution: fire_precautions, access_exit: access_exit,
        safety_signs: safety_signs, stairs_staircases: stairs_staircases, gangways: gangways, floors: floors,
        lightening: lightening, housekeeping: housekeeping, user: user
    });
});
route.get('/table4', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    const ladder = await AuditLadder.findAll({ where: { userId: req.user.id } });
    const handtools = await AuditHandTools.findAll({ where: { userId: req.user.id } });
    res.status(200).render('../audit/table/sectionTable4', { alert: [], ladder: ladder, handtools: handtools, user: user });
});

route.get('/table5', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    const welfare = await AuditWelFare.findAll({ where: { userId: req.user.id } });
    res.status(200).render('../audit/table/sectionTable5', { alert: [], welfare: welfare, user: user });
});

route.get('/intro', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    const bank_audit = await AuditBankAudit.findAll({ where: { userId: req.user.id } });
    const executive_summary = await AuditExecutiveSummary.findAll({ where: { userId: req.user.id } });
    res.status(200).render('../audit/table/introduction', { alert: [], user: user, bank_audit: bank_audit, executive_summary: executive_summary });
});

route.get('/pictorials', isAuthenticated, async (req, res) => {
    const user = await User.findOne({ where: { id: req.user.id }, include: { model: Audit_User } });
    const image_path = await ImagePaths.findAll({ where: { userId: req.user.id } });
    res.status(200).render('../audit/table/pictorial', { alert: [], user: user, image_path: image_path });
});


module.exports = route;