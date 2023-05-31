const express = require("express");
const { payloadAudit, isAuthenticated } = require("../../utils/helper.util");
const User = require("../../model/user.model");
const Audit_User = require("../../model/audit/audit_user.model");
const Task = require("../../model/audit/task.model");
const route = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


route.get('/', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/index', { alert: [] });
});

route.post('/preview', isAuthenticated, async (req, res) => {
    const result = payloadAudit(req);
    localStorage.setItem('audit', JSON.stringify(result));
    res.status(200).json('success');
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
route.get('/section6', isAuthenticated, async (req, res) => {
    console.log();
    res.status(200).render('../audit/inputs/section6', { alert: [] });
});
route.get('/preview', isAuthenticated, async (req, res) => {
    res.status(200).render('../audit/inputs/preview', { alert: [] });
});


module.exports = route;