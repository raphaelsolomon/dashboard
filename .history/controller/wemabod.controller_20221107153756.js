const { Op } = require("sequelize");
var XLSX = require("xlsx");
const {
  PLASTIC_HEADER,
  PLASTIC_ATTRIBUTE,
} = require("../constant/value.const");
const Wemabod = require("../model/wembod.model");
const date = require("date-and-time");
const path = require("path");
const resultPerPage = 30;

exports.wemabodIndex = async (req, res, next) => {
  const firstPage = await require("../chartQuery/wemabod.query").firstPage(req, res);
  //==========================================================
  const listItem = await req.user.getWemabods({
    limit: 7,
    order: [["createdAt", "DESC"]],
  });
  
  const notification = await req.user.getNotifications({
    where: { isseen: false },
  });
  // return res.status(200).sendFile(path.join(__dirname, '../views/wemabod/index.html'))
  return res.status(200).render("../wemabod/index", {
    listItem: listItem,
    user: req.user,
    firstPage: firstPage,
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
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  const count = await Wemabod.count({ where: { userId: req.user.id } });
  if (count > 0) {
    const totalResults = count;
    const numbersOfPage = Math.ceil(totalResults / resultPerPage);
    let page = req.query.page ? Number(req.query.page) : 1
    if (page > numbersOfPage) {
      res.redirect(`/table?page=${encodeURIComponent(numbersOfPage)}`)
    } else if (page < 1) {
      res.redirect(`/table?page=${encodeURIComponent('1')}`)
    }
    //Deteremin the sql limit starting number
    const startingLimit = (page - 1) * resultPerPage;
    const newQuery = await Wemabod.findAll({ limit: [startingLimit, resultPerPage], order: [["createdAt", "DESC"]] });
    if (newQuery) {
      let iterator = (page - 5) < 1 ? 1 : page - 5;
      let endingLink = (iterator + 9) <= numbersOfPage ? (iterator + 9) : page + (numbersOfPage - page)

      if (endingLink < (page + 4)) {
        iterator -= (page + 4) - numbersOfPage;
      }
      return res.status(200).render("../wemabod/table", {
        listItem: newQuery,
        page,
        iterator,
        endingLink,
        numbersOfPage,
        user: req.user,
        title: "Tables",
        notification: notification,
        isData: true
      });
    }
  } else {
    let page = 0, iterator = 0, endingLink = 0, numbersOfPage = 0;
    return res.status(200).render("../logistics/table", {
      listItem: [],
      page,
      iterator,
      endingLink,
      numbersOfPage,
      user: req.user,
      title: "Tables",
      notification: notification,
      isData: false
    });
  }
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

exports.getEdit = async (req, res, next) => {
  const notification = await req.user.getNotifications({ where: { isseen: false } });
  const wemabod = await Wemabod.findOne({ where: { id: req.query.id } });
  return res.status(200).render("../wemabod/edit", { user: req.user, notification: notification, wemabod, title: 'Edit Record' });
}

exports.update = async (req, res, next) => {
  const wemabod = await Wemabod.findOne({ where: { id: req.params.id } });
  await wemabod.update(req.body);
  await wemabod.save();
  return res.status(200).redirect(`/table`);
}