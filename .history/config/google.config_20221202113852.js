const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../model/user.model');


//Get the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from Google Developer Console
const GOOGLE_CLIENT_ID = "898273018789-3r076agattfqssdidkqhjj73t659difn.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/salon/auth/google/callback",
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);
    User.findOne({ where: { email: username } }).then((user) => {
        if(!user) {
            return done(null, profile);
        }
    }).catch((err) => done(err));
   
}));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log(user)
    User.findOne({ where: { email: user.email } })
        .then((e) => done(null, e)
        ).catch((e) => done(err)
        );
}) 
