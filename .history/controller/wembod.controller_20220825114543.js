const Commodity = require("../model/commodity.model");
var XLSX = require("xlsx");
const {
  COMMODITY_HEADER,
  COMMODITY_ATTRIBUTE,
} = require("../constant/value.const");

exports.commodityIndex = async (req, res, next) => {
  const limitWemboad = await req.user.getWemabods({
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