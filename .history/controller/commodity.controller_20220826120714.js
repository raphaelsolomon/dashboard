const Commodity = require("../model/commodity.model");
var XLSX = require("xlsx");
const {
  COMMODITY_HEADER,
  COMMODITY_ATTRIBUTE,
} = require("../constant/value.const");
const resultPerPage = 30;

exports.commodityIndex = async (req, res, next) => {
  const limitPlastic = await req.user.getCommodities({
    limit: 7,
    order: [["createdAt", "DESC"]],
  });
  var data = {
    tableLimit: limitPlastic,
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
  const commodities = await req.user.getCommodities();
  const totalResults = commodities.length;
  const numbersOfPage = Math.ceil(totalResults / resultPerPage);
  let page = req.query.page ? Number(req.query.page) : 1
  if (page > numbersOfPage) {
    res.redirect(`/table?page=${encodeURIComponent(numbersOfPage)}`)
  } else if (page < 1) {
    res.redirect(`/table?page=${encodeURIComponent('1')}`)
  }
  //Deteremin the sql limit starting number
  const startingLimit = (page - 1) * resultPerPage;
  const newQuery = await req.user.getCommodities({ limit: [startingLimit, resultPerPage] });
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
    .render("../commodities/add", { user: req.user, title: "Add Items", notification: notification});
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
  const notification = await req.user.getNotifications({where: {isseen: false}});
  const commodity = await Commodity.findOne({where: {id: req.params.id}});
  return res.status(200).render("../wemabod/edit", {user: req.user, notification: notification, commodity, title: 'Edit Record'});
}

exports.update = async (req, res, next) => {
  const commodity = await Commodity.findOne({where: {id: req.params.id}});
  await wemabod.update(req.body);
  await wemabod.save();
  return res.status(200).redirect(`/details/${plastic.id}`);
}