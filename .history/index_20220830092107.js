const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database.config');
const passport = require('passport');
const path = require('path');
var cookieParser = require('cookie-parser')
const session = require('express-session');
const extendDefaultFields = require('./model/session.model');
const User = require('./model/user.model');
const Logistics = require('./model/logistics.model');
const Plastic = require('./model/plastic.model');
const flash = require('connect-flash');
const Commodity = require('./model/commodity.model');
const Notification = require('./model/notification.model');
const Wemabod = require('./model/wembod.model')
var SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config();
const https = require('https');
const http = require('http');
const { options } = require('./utils/helper.util');

require('./config/passport.config');

app.use(cookieParser());
app.use(cors());

app.use(
    session({
        secret: process.env.SECRETKEY,
        store: store,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    })
);
app.use(passport.initialize());
app.use(passport.session());


var store = new SequelizeStore({
    db: sequelize,
    table: "sessions",
    extendDefaultFields: extendDefaultFields,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 1000 * 60 * 60 * 24
});

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/includes'),
    path.join(__dirname, 'views/logistics'),
    path.join(__dirname, 'views/plastics'),
    path.join(__dirname, 'views/auths'),
    path.join(__dirname, 'views/commodities'),
    path.join(__dirname, 'views/wemabod')
]);
app.set('view engine', 'ejs');
app.use(flash());

app.use((req, res, next) => {
    console.log(req.protocol)
})
app.use(require('./routes/routes.route'));
app.use((req, res, next) => {
    return res.status(404).render('../auths/404');
})

User.hasMany(Logistics);
User.hasMany(Plastic);
User.hasMany(Notification)
User.hasMany(Commodity);
User.hasMany(Wemabod);
Logistics.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Plastic.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Commodity.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Wemabod.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Notification.belongsTo(User, { constraints: true, onDelete: "CASCADE" });


sequelize.sync({ alter: true })
    .then((_) => {
       app.listen(PORT, () => console.log('listening on port ' + PORT));
    })
    .catch((err) => console.log(err))