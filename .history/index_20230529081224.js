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
const Sorting = require('./model/sorting.model');
const Crushing = require('./model/crush.model');
const Audit_User = require('./model/audit/audit_user.model');
const Task = require('./model/audit/task.model');
const fileUpload = require('express-fileupload')
require('./config/passport.config');

app.use(cookieParser());
//app.use(cors({origin: "http://localhost:4000"}));

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
app.use(express.static(path.join(__dirname, 'public/admin')));
app.use(express.static(path.join(__dirname, 'public/hse')));
app.use(express.static(path.join(__dirname, 'public/fort')));
app.use(express.static(path.join(__dirname, 'public/salon')));
app.use(express.static(path.join(__dirname, 'public/health')));
app.use(express.static(path.join(__dirname, 'public/dashboard')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload())

app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/includes'),
    path.join(__dirname, 'views/admin'),
    path.join(__dirname, 'views/fort'),
    path.join(__dirname, 'views/admin/plastics'),
    path.join(__dirname, 'views/admin/plastics/layout'),
    path.join(__dirname, 'views/started'),
    path.join(__dirname, 'views/logistics'),
    path.join(__dirname, 'views/plastics'),
    path.join(__dirname, 'views/auths'),
    path.join(__dirname, 'views/commodities'),
    path.join(__dirname, 'views/wemabod'),
    path.join(__dirname, 'views/salon'),
    
    path.join(__dirname, 'views/hse/auths'),
    path.join(__dirname, 'views/hse/includes'),
    path.join(__dirname, 'views/hse/inputs'),
    path.join(__dirname, 'views/hse/tables'),
    path.join(__dirname, 'views/hse/edits'),

    path.join(__dirname, 'views/health'),
    path.join(__dirname, 'views/sweepers'),
    path.join(__dirname, 'views/recycling'),
    path.join(__dirname, 'views/vulcanizer'),
    path.join(__dirname, 'views/voters'),
    path.join(__dirname, 'views/old_age'),

    path.join(__dirname, 'views/delivery'),
    path.join(__dirname, 'views/audit'),
]);
app.set('view engine', 'ejs');


app.use(flash());
app.use(require('./routes/routes.route'));
app.use('/fort', require('./routes/fortes.route'));
app.use('/admin/hse', require('./routes/hse/auth.route'));
app.use('/admin/hse/input', require('./routes/hse/input.route'));
app.use('/admin/hse/table', require('./routes/hse/table.route'));
app.use('/salon', require('./routes/salon/salon.route'));
app.use('/OSHsurvey', require('./routes/survey/survey.route'));
app.use('/summit/reg', require('./routes/health/health.route'));
app.use('/survey/sweeper', require('./routes/sweeper/sweeper.route'));
app.use('/survey/recycling', require('./routes/recycling/recycling.route'));
app.use('/survey/vulcanizer', require('./routes/vulcanizer/vulcanizer.route'));
app.use('/survey/voters', require('./routes/voters/voter.route'));
app.use('/survey/old', require('./routes/old/old.route'));
app.use('/survey/delivery', require('./routes/delivery/delivery.route'));
app.use('/audit', require('./routes/audit/audit.route'));
app.use((req, res, next) => {
    return res.status(404).render('../auths/404');
})

User.hasMany(Logistics);
User.hasMany(Plastic);
User.hasMany(Notification)
User.hasMany(Commodity);
User.hasMany(Wemabod);
User.hasMany(Sorting);
User.hasMany(Crushing);
User.hasMany(Task);
User.hasOne(Audit_User);
Logistics.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Plastic.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Commodity.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Wemabod.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Notification.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Sorting.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Crushing.belongsTo(User, { constraints: true, onDelete: "CASCADE" })
Task.belongsTo(User, { constraints: true, onDelete: "CASCADE" })
Audit_User.belongsTo(User, { constraints: true, onDelete: "CASCADE" });



app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
    sequelize.sync({ alter: true }).catch((err) => console.log(err))
});





    // <!-- <%- include('../includes/header.ejs') %> <!-- MAIN CONTENT-->
    // <div class="main-content">
    //     <div class="section__content section__content--p30">
    //         <div class="container-fluid">
    //             <% if(user.chart3 !== '' && user.chart3 !== null) { %>
    //             <div id="Container" style="padding-bottom:56.25%; position:relative; display:block; width: 100%">
    //                 <iframe id="ViostreamIframe" width="100%" height="100%"
    //                     src= <%= user.chart3 %>
    //                     frameborder="0" allowfullscreen="" style="position:absolute; top:0; left: 0"></iframe>
    //             </div>
    //             <% } %>
    //         </div>
    //     </div>
    // </div>

    // <!-- end document-->
    // <%- include('../includes/footer.ejs') %>
    // <script src="js/commodity.js"></script> -->


    