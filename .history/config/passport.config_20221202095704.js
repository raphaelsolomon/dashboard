const User = require('../model/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helper = require('../utils/helper.util');
require('dotenv').config();

const customFields = {
    usernameField: 'email',
    passwordFields: 'password'
};

const verifyCallBack = (username, password, done) => {
    User.findOne({ where: { email: username } }).then((user) => {
        if (!user) {
            return done(null, false)
        }
        const valid = helper.verifyPassword(password, user.password);
        if (valid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch((err) => done(err));
}

passport.use(new LocalStrategy(customFields, verifyCallBack));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findOne({ where: { id: userId } })
        .then((user) => done(null, user))
        .catch((err) => done(err));
});