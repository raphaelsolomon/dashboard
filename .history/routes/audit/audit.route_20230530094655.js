const express = require("express");
const { payloadAudit, isAuthenticated } = require("../../utils/helper.util");
const User = require("../../model/user.model");
const Audit_User = require("../../model/audit/audit_user.model");
const Task = require("../../model/audit/task.model");
const ImagePaths = require("../../model/audit/images.model");
const { AuditBankAudit, AuditWelFare, AuditControlSubstance, AuditEmergencyProceedure, AuditExecutiveSummary, AuditIncident, AuditLadder, AuditLiftOpt, AuditReportInjuries, AuditMgtReviews, AuditSafetyPolicy, AuditHandTools } = require("../../model/audit/lifting_opt.model");
const { AuditTraining, AuditSafetySystem, AuditCommunication, AuditContractorsMgt, AuditPermitWork } = require("../../model/audit/training.model");
const AuditElectricity = require("../../model/audit/electricity.model");
const AuditFirstAid = require("../../model/audit/first_aid.model");
const AuditFirstSafety = require("../../model/audit/first_safety.model");
const WasteMgt = require("../../model/audit/waste_mgt.model");
const { AuditTemperatures } = require("../../model/audit/environment.model");
const route = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


route.get('/', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/index', { alert: [] });
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
    const user = await User.findOne({
        where: { id: req.user.id }, include: { model: Audit_User }
    });
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
route.get('/task/:id', isAuthenticated, async (req, res) => {
    const task = await Task.findOne({ where: { id: req.params.id } });
    console.log(task);
    if (task) {
        task.isCompleted = !task.isCompleted;
        return task.save().then((_) => res.status(200).json('success'));
    }
});
route.get('/introduction', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/introduction', { alert: [] });
});
route.get('/introduction', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/introduction', { alert: [] });
});
route.get('/section1', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/section1', { alert: [] });
});
route.get('/section2', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/section2', { alert: [] });
});
route.get('/section3', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/section3', { alert: [] });
});
route.get('/section4', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/section4', { alert: [] });
});
route.get('/section5', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/section5', { alert: [] });
});
route.get('/section6', async (req, res) => {
    res.status(200).render('../audit/inputs/section6', { alert: [] });
});
route.post('/submission', isAuthenticated, async (req, res) => {
    const result = payloadAudit(req);
    console.log(result);
    await ImagePaths.create(result.images);
    await AuditBankAudit.create(result.bank_audit);
    await AuditTraining.create(result.training);
    await AuditSafetySystem.create(result.safe_system);
    await AuditCommunication.create(result.communication);
    await AuditContractorsMgt.create(result.contractors_management);
    await AuditControlSubstance.create(result.control_substances);
    await AuditElectricity.create(result.electricity);
    await AuditEmergencyProceedure.create(result.emergency_procedure);
    await AuditFirstAid.create(result.first_aid);
    await AuditFirstSafety.create(result.first_safety);
    await AuditIncident.create(result.incident_accident);
    await AuditExecutiveSummary.create(result.executive_summary);
    await AuditWelFare.create(result.welfare);
    await AuditLadder.create(result.ladders);
    await AuditLiftOpt.create(result.lifting_operations);
    await AuditReportInjuries.create(result.reporting_injuries);
    await AuditMgtReviews.create(result.management_review);
    await AuditSafetyPolicy.create(result.safety_policy)
    await AuditPermitWork.create(result.permit_work);
    await AuditInsurance.create(result.insurance);
    await WasteMgt.create(result.waste_management);
    await AuditHandTools.create(result.handtools);
    res.status(200).json('success');
});
route.get('/preview', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/preview', { alert: [] });
});

//===============================TABLES======================
route.get('/section/table1', isAuthenticated, async (req, res) => {
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
    res.status(200).render('../audit/table/sectionTable1', { alert: [], });
});

route.get('/section/table2', isAuthenticated, async (req, res) => {
    const injuries = await AuditReportInjuries.findAll({ where: { userId: req.user.id } });
    const first_aid = await AuditFirstAid.findAll({ where: { userId: req.user.id } });
    const first_safety = await AuditFirstSafety.findAll({ where: { userId: req.user.id } });
    const lifting = await AuditLiftOpt.findAll({ where: { userId: req.user.id } });
    const control_substances = await AuditControlSubstance.findAll({ where: { userId: req.user.id } });
    const electric = await AuditElectricity.findAll({ where: { userId: req.user.id } });
    res.status(200).render('../audit/table/sectionTable2', { alert: [], injuries: injuries, first_aid: first_aid, first_safety: first_safety, lifting: lifting, control_substances: control_substances, electric: electric });
});

route.get('/table3', isAuthenticated, async (req, res) => {
    const temperature = await AuditTemperatures.findAll({ where: { userId: req.user.id } });
    const fire_precautions = await ;
    const access_exit = await;
    const safety_signs = await;
    const stairs_staircases = await;
    res.status(200).render('../audit/table/sectionTable3', { alert: [], temperature: temperature, fire_precaution: fire_precautions, access_exit: access_exit, safety_signs: safety_signs, stairs_staircases: stairs_staircases });
});
route.get('/table4', isAuthenticated, async (req, res) => {
    const ladder = await AuditLadder.findAll({ where: { userId: req.user.id } });
    const handtools = await AuditHandTools.findAll({ where: { userId: req.user.id } });
    res.status(200).render('../audit/table/sectionTable4', { alert: [], ladder: ladder, handtools: handtools });
});
route.get('/table5', isAuthenticated, async (req, res) => {
    const welfare = await AuditWelFare.findAll({ where: { userId: req.user.id } });
    res.status(200).render('../audit/table/sectionTable5', { alert: [], welfare: welfare });
});


module.exports = route;