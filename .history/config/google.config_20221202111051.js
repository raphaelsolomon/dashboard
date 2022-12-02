const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

//Get the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from Google Developer Console
const GOOGLE_CLIENT_ID = "898273018789-3r076agattfqssdidkqhjj73t659difn.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/salon/auth/google/callback",
    passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done)));

passport.serializeUser( (user, done) => { 
    console.log(`\n--------> Serialize User:`);
    console.log(user);
    done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log("\n--------- Deserialized User:")
    console.log(user)
    done (null, user)
}) 
