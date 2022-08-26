const { Op } = require("sequelize");
var XLSX = require("xlsx");
const {
  PLASTIC_HEADER,
  PLASTIC_ATTRIBUTE,
} = require("../constant/value.const");
const Wema = require("../model/plastic.model");
const date = require("date-and-time");

exports.wemabodIndex = async (req, res, next) => {
  const limitPlastic = await req.user.getPlastics({
    limit: 7,
    order: [["date", "DESC"]],
  });
  var data = {
    tableLimit: [],
  };

  const notification = await req.user.getNotifications({
    where: { isseen: false },
  });
  return res.status(200).render("../wemabod/index", {
    user: req.user,
    data: data,
    title: "Wemabod Admin",
    notification: notification,
  });
};

exports.addItem = async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res.status(200).render("../wemabod/add", {
    user: req.user,
    title: "Add Items",
    notification: notification,
  });
};

exports.getTable = async (req, res, next) => {
  const wemabod = await Wemabod.findAll();
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res.status(200).render("../wemabod/table", {
    listItem: plastics,
    user: req.user,
    title: "Tables",
    notification: notification,
  });
};

exports.recentId = async (req, res, next) => {
  var plastics = [];
  if (req.params.id === 1) {
    plastics = await req.user.getPlastics({
      limit: 7,
      order: [["createdAt", "DESC"]],
      attributes: PLASTIC_ATTRIBUTE,
      raw: true,
    });
  } else {
    plastics = await req.user.getPlastics({
      attributes: PLASTIC_ATTRIBUTE,
      raw: true,
    });
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(plastics, {
    origin: "A2",
    skipHeader: true,
  });
  XLSX.utils.sheet_add_aoa(ws, [PLASTIC_HEADER]);
  XLSX.utils.book_append_sheet(wb, ws, "Plastics");
  const buffer = XLSX.write(wb, { bookType: "csv", type: "buffer" });
  res.attachment(`plastic_${Date.now()}.csv`);

  return res.send(buffer);
};

exports.deleteItem = async (req, res, next) => {
  return Plastics.destroy({ where: { id: req.params.id } })
    .then((_) => {
      return res.status(200).redirect("/table");
    })
    .catch((err) => console.log(err));
};

exports.getCharts = async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res.status(200).render("../wemabod/chart", {
    title: "Charts",
    user: req.user,
    notification: notification,
  });
};
