const express = require("express");
const { payloadAudit, isAuthenticated } = require("../../utils/helper.util");
const User = require("../../model/user.model");
const Audit_User = require("../../model/audit/audit_user.model");
const Task = require("../../model/audit/task.model");
const ImagePaths = require("../../model/audit/images.model");
const { AuditBankAudit, AuditWelFare, AuditControlSubstance, AuditEmergencyProceedure, AuditExecutiveSummary, AuditIncident, AuditLadder, AuditLiftOpt, AuditReportInjuries, AuditMgtReviews, AuditSafetyPolicy } = require("../../model/audit/lifting_opt.model");
const { AuditTraining, AuditSafetySystem, AuditCommunication, AuditContractorsMgt, AuditPermitWork } = require("../../model/audit/training.model");
const AuditElectricity = require("../../model/audit/electricity.model");
const AuditFirstAid = require("../../model/audit/first_aid.model");
const AuditFirstSafety = require("../../model/audit/first_safety.model");
const route = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


route.get('/', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/index', { alert: [] });
});
route.get('/profile', isAuthenticated, async (req, res) => {
    const user = await User.findOne({
        where: { id: req.user.id }, include:[ {
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
        return user.update(req.body).then((_) =>  res.status(200).redirect('/audit/profile'))
    } else {
        const audit_user = await Audit_User.findOne({ where: { userId: user.id } });
        if (audit_user) {
            return audit_user.update(req.body).then((_) =>  res.status(200).redirect('/audit/profile'));
        }
        req.body['userId'] = user.id;
        return Audit_User.create(req.body).then((result) =>  res.status(200).redirect('/audit/profile'));
    }
});
route.post('/task', isAuthenticated, async (req, res) => {
    const task = await req.user.createTask(req.body);
    res.status(200).json(task);
});
route.get('/task/:id', isAuthenticated, async (req, res) => {
    const task = await Task.findOne({where: {id: req.params.id}});
    console.log(task);
    if(task){
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
    ImagePaths.create(result.images);
    AuditBankAudit.create(result.bank_audit);
    AuditTraining.create(result.training);
    AuditSafetySystem.create(result.safe_system);
    AuditCommunication.create(result.communication);
    AuditContractorsMgt.create(result.contractors_management);
    AuditControlSubstance.create(result.control_substances);
    AuditElectricity.create(result.electricity);
    AuditEmergencyProceedure.create(result.emergency_procedure);
    AuditFirstAid.create(result.first_aid);
    AuditFirstSafety.create(result.first_safety);
    AuditIncident.create(result.incident_accident);
    AuditExecutiveSummary.create(result.executive_summary);
    AuditWelFare.create(result.welfare);
    AuditLadder.create(result.ladders);
    AuditLiftOpt.create(result.lifting_operations);
    AuditReportInjuries.create(result.reporting_injuries);
    AuditMgtReviews.create(result.management_review);
    AuditSafetyPolicy.create(result.)
    AuditPermitWork.create(result.permit_work);
    res.status(200).json('success');
});
route.get('/preview', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/preview', { alert: [] });
});


module.exports = route;