const Logistics = require("../model/logistics.model");
const date = require("date-and-time");
const sequelize = require("../config/database.config");
const { Op, where } = require("sequelize");
var currencyFormatter = require("currency-formatter");
const XLSX = require("xlsx");
var currencyFormatter = require("currency-formatter");
const {
  LOGISTIC_ATTRIBUTE,
  LOGISTIC_HEADER,
} = require("../constant/value.const");
const resultPerPage = 30;

exports.logisticIndex = async (req, res, next) => {
  //list of deliveries with limit
  const limitLogist = await req.user.getLogistics({
    limit: 7,
    order: [["createdAt", "DESC"]],
  });
  //Amount Of Money Made Daily
  var data = {
    tableLimit: limitLogist,
  };

  const notification = await req.user.getNotifications({
    where: { isseen: false },
  });
  return res
    .status(200)
    .render("../logistics/index", {
      title: "Logistics",
      user: req.user,
      data: data,
      notification: notification
    });
};

exports.recentId = async (req, res, next) => {
  var logistic = [];
  if (req.params.id === 1) {
    logistic = await req.user.getLogistics({
      limit: 7,
      order: [["createdAt", "DESC"]],
      attributes: LOGISTIC_ATTRIBUTE,
      raw: true,
    });
  } else {
    logistic = await req.user.getLogistics({
      attributes: LOGISTIC_ATTRIBUTE,
      raw: true,
    });
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(logistic, {
    origin: "A2",
    skipHeader: true,
  });
  XLSX.utils.sheet_add_aoa(ws, [LOGISTIC_HEADER]);
  XLSX.utils.book_append_sheet(wb, ws, "Logistics");
  const buffer = XLSX.write(wb, { bookType: "csv", type: "buffer" });
  res.attachment(`logistics_${Date.now()}.csv`);

  return res.send(buffer);
};

exports.addItem = async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res
    .status(200)
    .render("../logistics/add", { user: req.user, title: "Add Items", notification: notification});
};

exports.getTable = async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  const logistics = await req.user.getLogistics();
  const totalResults = logistics.length;
  const numbersOfPage = Math.ceil(totalResults / resultPerPage);
  let page = req.query.page ? Number(req.query.page) : 1
  if (page > numbersOfPage) {
    res.redirect(`/table?page=${encodeURIComponent(numbersOfPage)}`)
  } else if (page < 1) {
    res.redirect(`/table?page=${encodeURIComponent('1')}`)
  }
  //Deteremin the sql limit starting number
  const startingLimit = (page - 1) * resultPerPage;
  const newQuery = await req.user.getLogistics({ limit: [startingLimit, resultPerPage] });
  if (newQuery) {
    let iterator = (page - 5) < 1 ? 1 : page - 5;
    let endingLink = (iterator + 9) <= numbersOfPage ? (iterator + 9) : page + (numbersOfPage - page)

    if (endingLink < (page + 4)) {
      iterator -= (page + 4) - numbersOfPage;
    }
    return res.status(200).render("../logistics/table", {
      listItem: newQuery,
      page,
      iterator,
      endingLink,
      numbersOfPage,
      user: req.user,
      title: "Tables",
      notification: notification,
    });
  }
};

exports.getCharts = async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res
    .status(200)
    .render("../logistics/chart", {
      title: "Charts",
      user: req.user,
      data: data,
      notification: notification
    });
};

exports.deleteItem = async (req, res, next) => {
  return Logistics.destroy({ where: { id: req.params.id } })
    .then((_) => {
      return res.status(200).redirect("/table");
    })
    .catch((err) => console.log(err));
};

exports.getEdit = async (req, res, next) => {
  const notification = await req.user.getNotifications({where: {isseen: false}});
  const plastic = await Plastic.findOne({where: {id: req.params.id}});
  return res.status(200).render("../plastics/edit", {user: req.user, notification: notification, plastic, title: 'Edit Plastics'});
}

exports.update = async (req, res, next) => {
  const plastic = await Plastic.findOne({where: {id: req.params.id}});
  await plastic.update(req.body);
  await plastic.save();
  return res.status(200).redirect(`/details/${plastic.id}`);
}