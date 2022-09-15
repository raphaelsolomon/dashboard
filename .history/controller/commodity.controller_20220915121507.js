const Commodity = require("../model/commodity.model");
var XLSX = require("xlsx");
const {
  COMMODITY_HEADER,
  COMMODITY_ATTRIBUTE,
} = require("../constant/value.const");
const sequelize = require("../config/database.config");
const resultPerPage = 30;

exports.commodityIndex = async (req, res, next) => {
  const limitPlastic = await req.user.getCommodities({
    limit: 7,
    order: [["createdAt", "DESC"]],
  });

  const completedTrans = await sequelize.query(`SELECT status, COUNT(*) AS magnitude FROM commodities where userId=${req.user.id} GROUP BY status ORDER BY magnitude DESC LIMIT 1`)
  const totalCount = await sequelize.query(`SELECT COUNT(*) as total FROM commodities where userId=${req.user.id}`);
  const mostSold = await sequelize.query(`SELECT commodity, COUNT(*) AS magnitude FROM commodities WHERE userId=${req.user.id} GROUP BY commodity ORDER BY magnitude DESC LIMIT 1`);
  const advertMedium = await sequelize.query(`SELECT advertising_medium, COUNT(*) AS magnitude FROM commodities WHERE userId=${req.user.id} GROUP BY advertising_medium ORDER BY magnitude DESC LIMIT 1`);

  console.log(completedTrans[0][0].magnitude);
  console.log(totalCount[0][0].total);
  console.log(mostSold[0][0].commodity);
  console.log(advertMedium[0][0].advertising_medium);

  var data = {
    tableLimit: limitPlastic,
    completedTrans: completedTrans[0][0].magnitude === undefined ? 0 : completedTrans[0][0].magnitude,
    totalCount: totalCount[0][0].total === undefined ? 0 : totalCount[0][0].total,
    mostSold: mostSold[0][0].commodity
  };

  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res.status(200).render("../commodities/index", {
    title: "Commodity Sales",
    user: req.user,
    data: data,
    notification: notification,
  });
};

exports.getTable = async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  const count = await Commodity.count({ where: { userId: req.user.id } });
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
    const newQuery = await req.user.getCommodities({ limit: [startingLimit, resultPerPage], order: [["createdAt", "DESC"]] });
    if (newQuery) {
      let iterator = (page - 5) < 1 ? 1 : page - 5;
      let endingLink = (iterator + 9) <= numbersOfPage ? (iterator + 9) : page + (numbersOfPage - page)

      if (endingLink < (page + 4)) {
        iterator -= (page + 4) - numbersOfPage;
      }
      return res.status(200).render("../commodities/table", {
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

exports.addItem = async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res
    .status(200)
    .render("../commodities/add", { user: req.user, title: "Add Items", notification: notification });
};

exports.getCharts = async (req, res, next) => {
  var data = {};
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res.status(200).render("../commodities/chart", {
    title: "Charts",
    user: req.user,
    data: data,
    notification: notification
  });
};

exports.deleteItem = async (req, res, next) => {
  return Commodity.destroy({ where: { id: req.params.id } })
    .then((_) => {
      return res.status(200).redirect("/table");
    })
    .catch((err) => console.log(err));
};

exports.recentId = async (req, res, next) => {
  var commodities = [];
  if (req.params.id === 1) {
    commodities = await req.user.getCommodities({
      limit: 7,
      order: [["createdAt", "DESC"]],
      attributes: COMMODITY_ATTRIBUTE,
      raw: true,
    });
  } else {
    commodities = await req.user.getCommodities({
      attributes: COMMODITY_ATTRIBUTE,
      raw: true,
    });
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(commodities, {
    origin: "A2",
    skipHeader: true,
  });
  XLSX.utils.sheet_add_aoa(ws, [COMMODITY_HEADER]);
  XLSX.utils.book_append_sheet(wb, ws, "Commodity");
  const buffer = XLSX.write(wb, { bookType: "csv", type: "buffer" });
  res.attachment(`commodity_${Date.now()}.csv`);

  return res.send(buffer);
};


exports.getEdit = async (req, res, next) => {
  const notification = await req.user.getNotifications({ where: { isseen: false } });
  const commodity = await Commodity.findOne({ where: { id: req.query.id } });
  return res.status(200).render("../commodities/edit", { user: req.user, notification: notification, commodity, title: 'Edit Record' });
}

exports.update = async (req, res, next) => {
  const commodity = await Commodity.findOne({ where: { id: req.params.id } });
  await commodity.update(req.body);
  await commodity.save();
  return res.status(200).redirect(`/table`);
}