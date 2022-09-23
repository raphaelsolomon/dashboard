const express = require("express");
const route = express.Router();
const passport = require("passport");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { uuid } = require("uuidv4");
const { isAuthenticated } = require("../utils/helper.util");
const { sendLink, sendRegisterLink, sendWelcomeLink } = require("../config/nodemailer-config");
const { Op } = require("sequelize");
const Notification = require("../model/notification.model");
const Commodity = require("../model/commodity.model");
const Logistic = require("../model/logistics.model");
const Plastic = require("../model/plastic.model");
const Wemabod = require("../model/wembod.model");
const path = require('path');

route.get('/', async (req, res, next) => {
  return res.status(200).render('../started/index');
})

route.get("/home", isAuthenticated, async (req, res, next) => {
  if (req.user.role == true) {
    return require("../controller/admin.controller").index(req, res);
  } else {
    if (req.user.trade === "Logistics") {
      return require("../controller/logistic.controller").logisticIndex(
        req,
        res,
        next
      );
    }
    if (req.user.trade === "Plastics") {
      return require("../controller/plastic.controller").plasticIndex(
        req,
        res,
        next
      );
    }
    if (req.user.trade === "Commodity") {
      return require("../controller/commodity.controller").commodityIndex(
        req,
        res,
        next
      );
    }
    if (req.user.trade === "Wemabod") {
      return require("../controller/wemabod.controller").wemabodIndex(
        req,
        res,
        next
      );
    }
  }
});

route.get("/recent/:id", isAuthenticated, async (req, res, next) => {
  if (req.user.trade === "Logistics") {
    return require("../controller/logistic.controller").recentId(
      req,
      res,
      next
    );
  }
  if (req.user.trade === "Plastics") {
    return require("../controller/plastic.controller").recentId(req, res, next);
  }
  if (req.user.trade === "Commodity") {
    return require("../controller/commodity.controller").recentId(
      req,
      res,
      next
    );
  }
});

route.get('/allusers',isAuthenticated, async (req, res, next)=> {
  const users = await User.findAll({
    where: { trade: 'Commodity' }, include: [{
        model: Commodity
    }]
});
  return res.status(200).render('../admin/allusers', {
    users: users
  });
})

route.get('/newusers', isAuthenticated, async (req, res, next)=> {
  const date = new Date();
    const fromDate = new Date(`${getPreviousDay().toISOString().substring(0, getPreviousDay().toISOString().indexOf('T'))} 00:00:00`);
    const toDate = new Date(`${date.toISOString().substring(0, date.toISOString().indexOf('T'))} 23:59:59`);
    const newUsers = await User.findAll({
        where: {
            createdAt: {
                [Op.between]: [
                   fromDate,
                   toDate
                ]
            }
        },
        include: [{model: Commodity}]
    })
  return res.status(200).render('../admin/newusers', {
    users: newUsers
  });
});

route.get('/activeusers', isAuthenticated, async (req, res, next)=> {
  const users = await User.findAll({
    where: { trade: 'Commodity' }, include: [{
        model: Commodity
    }]});
    const Active = users.filter((e) => e.commodities.length > 0);
  return res.status(200).render('../admin/activeusers', {users: Active});
});

route.get('/inactiveusers', isAuthenticated, async (req, res, next)=> {
  const users = await User.findAll({
    where: { trade: 'Commodity' }, include: [{
        model: Commodity
    }]});
    const InActive = users.filter((e) => e.commodities.length <= 0);
  return res.status(200).render('../admin/inactiveusers', {users: InActive});
});

route.get("/add", isAuthenticated, (req, res, next) => {
  if (req.user.trade === "Logistics") {
    return require("../controller/logistic.controller").addItem(req, res, next);
  }
  if (req.user.trade === "Plastics") {
    return require("../controller/plastic.controller").addItem(req, res, next);
  }
  if (req.user.trade === "Commodity") {
    return require("../controller/commodity.controller").addItem(req, res);
  }
  if (req.user.trade === "Wemabod") {
    return require("../controller/wemabod.controller").addItem(req, res);
  }
});

route.post("/add", isAuthenticated, async (req, res, next) => {
  if (req.user.trade === "Logistics") {
    req.user.createLogistic(req.body);
  }
  if (req.user.trade === "Plastics") {
    req.user.createPlastic(req.body);
  }
  if (req.user.trade === "Commodity") {
    req.user.createCommodity(req.body);
  }
  if (req.user.trade === "Wemabod") {
    req.user.createWemabod(req.body);
  }
  return res.status(200).redirect("/table");
});

route.get("/table", isAuthenticated, async (req, res, next) => {
  if (req.user.trade === "Logistics") {
    return require("../controller/logistic.controller").getTable(
      req,
      res,
      next
    );
  }
  if (req.user.trade === "Plastics") {
    return require("../controller/plastic.controller").getTable(req, res, next);
  }
  if (req.user.trade === "Wemabod") {
    return require("../controller/wemabod.controller").getTable(req, res, next);
  }
  if (req.user.trade === "Commodity") {
    return require("../controller/commodity.controller").getTable(
      req,
      res,
      next
    );
  }
});

route.get("/chart", isAuthenticated, async (req, res, next) => {
  if (req.user.trade === "Logistics") {
    return require("../controller/logistic.controller").getCharts(
      req,
      res,
      next
    );
  }

  if (req.user.trade === "Plastics") {
    return require("../controller/plastic.controller").getCharts(
      req,
      res,
      next
    );
  }

  if (req.user.trade === "Commodity") {
    return require("../controller/commodity.controller").getCharts(
      req,
      res,
      next
    );
  }
  if (req.user.trade === "Wemabod") {
    return require("../controller/wemabod.controller").getCharts(
      req,
      res,
      next
    );
  }
});

route.get("/delete/:id", isAuthenticated, async (req, res, next) => {
  if (req.user.trade === "Logistics") {
    return require("../controller/logistic.controller").deleteItem(
      req,
      res,
      next
    );
  }

  if (req.user.trade === "Plastics") {
    return require("../controller/plastic.controller").deleteItem(
      req,
      res,
      next
    );
  }

  if (req.user.trade === "Commodity") {
    return require("../controller/commodity.controller").deleteItem(
      req,
      res,
      next
    );
  }

  if (req.user.trade === "Wemabod") {
    return require("../controller/wemabod.controller").deleteItem(
      req,
      res,
      next
    );
  }
});

route.get("/details", isAuthenticated, async (req, res, next) => {
  if (req.user.trade === "Logistics") {
    return require("../controller/logistic.controller").getEdit(req, res);
  }
  if (req.user.trade === "Plastics") {
    return require("../controller/plastic.controller").getEdit(req, res);
  }
  if (req.user.trade === "Wemabod") {
    return require("../controller/wemabod.controller").getEdit(req, res);
  }
  if (req.user.trade === "Commodity") {
    return require("../controller/commodity.controller").getEdit(req, res);
  }
});

route.post("/details/:id", isAuthenticated, async (req, res, next) => {
  if (req.user.trade === "Logistics") {
    return require("../controller/logistic.controller").update(req, res);
  }
  if (req.user.trade === "Plastics") {
    return require("../controller/plastic.controller").update(req, res);
  }
  if (req.user.trade === "Wemabod") {
    return require("../controller/wemabod.controller").update(req, res);
  }
  if (req.user.trade === "Commodity") {
    return require("../controller/commodity.controller").update(req, res);
  }
});

//===============================AUTHENTICATION MODE===========================================

route.get("/register", async (req, res, next) => {
  const user = await User.findOne({where: {trade: }})
  return res.status(200).render("../auths/register", { alert: [], isAvailable: false});
});

route.post("/register", async (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(password, salt);

  const exists = await User.findOne({ where: { email: req.body.email } });
  if (exists) {
    const errors = [];
    errors.push({ msg: "this user already exists", error: true });
    return res.render("../auths/register", { alert: errors });
  } else {
    return User.create(req.body)
      .then((user) => {
        if (user) {
          user.createNotification({ message: `Welcome to the Dechdash Platform!\nWe're so glad to have you here.\nRegards` });
          user.createNotification({ message: `Start inputting your data.\nThanks for choosing Dechdash.\nKindly proceed to input your data by clicking on “Add Data”\nRegards` });
          req.flash("success", 'Your account has been successfully created, please sign in');
          sendRegisterLink(user);
          sendWelcomeLink(user);
          return res.status(200).redirect("/login");
        }
        return res.status(404).redirect("/404");
      })
      .catch((err) => console.log(err));
  }
});

route.get("/login", (req, res, next) => {
  if (req.flash("success").length === 0) {
    return res.status(200).render("../auths/login", { msg: '' });
  }
  return res.status(200).render("../auths/login", {
    msg: "your Account has been registered successfully",
  });
});

route.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: '/home',
  failureFlash: true,
}));

route.get("/forget-password", (req, res, next) => {
  return res.status(200).render("../auths/forgot");
});

route.post("/forget-password", async (req, res, next) => {
  const { email } = req.body;
  const token = uuid();
  let user = await User.findOne(req.body);
  if (user) {
    user.token = `${token}`;
    user.save();
    return sendLink(`https://dechdash.net/reset-password?id=${token}}`, email, req, res);
  }
  return res.status(404).redirect("/404");
});

route.post("/update", isAuthenticated, async (req, res, next) => {
  req.user.business_name = req.body.business_name;
  req.user.save();
  return res.status(200).redirect("/profile");
});

route.get("/reset-password", async (req, res, next) => {
  const { id } = req.query;
  return User.findOne({ where: { token: id } }).then((user) => {
    if (user) {
      return res.status(200).render("../auths/renew", { token: id });
    }
  });
});

route.post("/reset-password", async (req, res, next) => {
  const { password, renew, id } = req.body;

  if (renew == password) {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);
    return User.findOne({ where: { token: id } })
      .then((user) => {
        if (!user) {
          return res.status(404).redirect("/404");
        }
        user.password = req.body.password;
        user.token = null;
        user.save();
        return res.status(200).redirect("/");
      })
      .catch((err) => console.log(err));
  } else {
    return res.status(404).json({ message: "password does not match" });
  }
});

route.post("/search", async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
  });
  const { search } = req.body;
  if (req.user.trade === "Wemabod") {
    return Wemabod.findAll({
      where: {
        [Op.or]: [
          {
            from_time: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            date: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            to_time: {
              [Op.like]: `%${search}%`,
            },
          }
        ],
      },
    }).then((wemabod) => {
      return res.status(200).render("../wemabod/search", {
        listItem: wemabod,
        user: req.user,
        notification: notification,
        title: "Search",
      });
    });
  }

  if (req.user.trade === "Plastics") {
    return Plastic.findAll({
      where: {
        [Op.or]: [
          {
            product: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            manufacturer: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            initial_content: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            zone: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            retrieved_from: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            plastic_size: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            tonnage: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            volume_of_plastics: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            date: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    }).then((plastic) => {
      return res.status(200).render("../plastics/search", {
        listItem: plastic,
        user: req.user,
        notification: notification,
        title: "Search",
      });
    });
  }

  if (req.user.trade === "Commodity") {
    return Commodity.findAll({
      where: {
        [Op.or]: [
          {
            purchased_cost: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            phone_no: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            customer_name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            commodity: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            commodity_size: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            commodity_color: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            sales_date: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            sales_cost: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            delivery_street: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    }).then((commodity) => {
      return res.status(200).render("../commodities/search", {
        listItem: commodity,
        user: req.user,
        notification: notification,
        title: "Search",
      });
    });
  }

  if (req.user.trade === "Logistics") {
    return Logistic.findAll({
      where: {
        [Op.or]: [
          {
            consignor: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            phone_number: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            itemToBeDelivered: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            pickupaddress_str: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            pickupaddress_area: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            consignee: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            c_phone_number: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            c_deliveryAddress_str: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            mode_of_pay: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            rider: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    }).then((logistics) => {
      return res.status(200).render("../logistics/search", {
        listItem: logistics,
        user: req.user,
        notification: notification,
        title: "Search",
      });
    });
  }
});

route.get("/logout", isAuthenticated, (req, res, next) => {
  req.logout((err) => {
    if (!err) {
      res.status(200).redirect("/login");
    }
  });
});

route.get("/changeRead/:id", isAuthenticated, async (req, res, next) => {
  Notification.findOne({ where: { id: req.params.id } })
    .then((notification) => {
      notification.isseen = true;
      notification.save();
      return res.status(200).json("success");
    })
    .catch((err) => {
      return res.status(200).json("failed");
    });
});

route.get("/profile", isAuthenticated, async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  const notification = await req.user.getNotifications({
    where: { isseen: false },
  });
  return res.status(200).render("../auths/profile", {
    user: user,
    title: "Profile",
    notification: notification,
  });
});

route.post("/change-pass", isAuthenticated, async (req, res, next) => {
  if (bcrypt.compareSync(req.body.old_pass, req.user.password)) {
    const { password, c_password } = req.body;
    if (password == c_password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(password, salt);
      return User.findOne({ where: { id: req.user.id } })
        .then((user) => {
          if (!user) {
            return res.status(404).redirect("/404");
          }
          user.password = req.body.password;
          user.save();
          return res
            .status(200)
            .render("../auths/profile", { user: user, title: "Profile" });
        })
        .catch((err) => console.log(err));
    }
    return res.status(404).redirect("/404");
  }
  return res.status(404).redirect("/404");
});

route.get("/404", (req, res, next) => {
  return res.status(404).render("../auths/404");
});

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

module.exports = route;
