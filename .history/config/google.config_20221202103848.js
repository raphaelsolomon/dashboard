const passport = require('passport');
const LocalStrategy = require('passport-google-oauth2').Strategy;

//Get the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from Google Developer Console
const GOOGLE_CLIENT_ID = "3184701-tn6finlstvgcgvte2381.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "XyLuTLHX6Ov_93IP"

authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback: true
}, authUser));