const Commodity = require("../model/commodity.model");
var XLSX = require("xlsx");
const {
  COMMODITY_HEADER,
  COMMODITY_ATTRIBUTE,
} = require("../constant/value.const");

exports.commodityIndex = async (req, res, next) => {
  const limitWembod = await req.user.getWemabods({
    limit: 7,
    order: [["createdAt", "DESC"]],
  });
  var data = {
    tableLimit: limitWembod,
  };

  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res.status(200).render("../wema/index", {
    title: "Wemabod",
    user: req.user,
    data: data,
    notification: notification,
  });
};