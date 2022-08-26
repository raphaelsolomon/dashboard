const { Op } = require("sequelize");
var XLSX = require("xlsx");
const {
  PLASTIC_HEADER,
  PLASTIC_ATTRIBUTE,
} = require("../constant/value.const");
const Wemabod = require("../model/wembod.model");
const date = require("date-and-time");
const path = require("path");
const reultPerPage = 30;

exports.wemabodIndex = async (req, res, next) => {
  const limitPlastic = await req.user.getWemabods({
    limit: 7,
    order: [["date", "DESC"]],
  });
  var data = {
    tableLimit: limitPlastic,
  };

  const notification = await req.user.getNotifications({
    where: { isseen: false },
  });
  // return res.status(200).sendFile(path.join(__dirname, '../views/wemabod/index.html'))
  return res.status(200).render("../wemabod/index", {
    data: data,
    user: req.user,
    title: "Tables",
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
  const totalResults = wemabod.length;
  const numbers
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res.status(200).render("../wemabod/table", {
    listItem: wemabod,
    user: req.user,
    title: "Tables",
    notification: notification,
  });
};

exports.recentId = async (req, res, next) => {
  var wemabod = [];
  if (req.params.id === 1) {
    wemabod = await req.user.getWemabods({
      limit: 7,
      order: [["createdAt", "DESC"]],
      attributes: WEMABODS_ATTRIBUTE,
      raw: true,
    });
  } else {
    wemabod = await req.user.getWemabods({
      attributes: WEMABODS_ATTRIBUTE,
      raw: true,
    });
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(plastics, {
    origin: "A2",
    skipHeader: true,
  });
  XLSX.utils.sheet_add_aoa(ws, [WEMABODS_HEADER]);
  XLSX.utils.book_append_sheet(wb, ws, "Wemabod");
  const buffer = XLSX.write(wb, { bookType: "csv", type: "buffer" });
  res.attachment(`wemabod_${Date.now()}.csv`);

  return res.send(buffer);
};

exports.deleteItem = async (req, res, next) => {
  return Wemabod.destroy({ where: { id: req.params.id } })
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
