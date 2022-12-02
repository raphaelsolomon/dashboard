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
    User.findOne({ where: { email: profile.emial } }).then((user) => {
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }).catch((err) => done(err));

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {
    User.findOne({ where: { id: userId } })
        .then((user) => done(null, user)
        ).catch((e) => done(err)
        );
}) 
