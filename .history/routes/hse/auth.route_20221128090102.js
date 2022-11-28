const express = require("express");
const route = express.Router();
 
route.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: '/home',
    failureFlash: true,
  }));


module.exports = route;