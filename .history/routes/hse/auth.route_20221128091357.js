const express = require("express");
const passport = require("passport");
const route = express.Router();

route.get('/', isAuthenticated, async (req, res, next) => {
    return res.status(200).redirect('/home');
})

route.get('/home', isAuthenticated, async (req, res, next) => {
    const generalCount = await GeneralInput.findAll({});
    const overview = await IncidentOverview.count({});
    const hse_inspection = await HSE_INSPECTIO.count({});
    const contractorCount = await Contractors_Mgt.count({});
    return res.status(200).render('../index', { generalCount: generalCount, overview: overview, hse_inspection: hse_inspection, contractorCount: contractorCount });
})


//===================================AUTHENTICATION MODE================================
route.get("/login", (req, res, next) => {
    if (req.flash("success").length === 0) {
        return res.status(200).render("../hse/auths/login", { msg: '' });
    }
    return res.status(200).render("../hse/auths/login", {
        msg: "your Account has been registered successfully",
    });
});

route.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: '/home',
    failureFlash: true,
}));


module.exports = route;