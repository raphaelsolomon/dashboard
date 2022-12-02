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
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true
}, authUser));

passport.serializeUser( (user, done) => { 
    console.log(`\n--------> Serialize User:`)
    console.log(user)
     // The USER object is the "authenticated user" from the done() in authUser function.
     // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

    done(null, user)
})