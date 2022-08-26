const Commodity = require("../model/commodity.model");
var XLSX = require("xlsx");
const {
  
} = require("../constant/value.const");

exports.wemabodIndex = async (req, res, next) => {
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
  return res.status(200).render("../wemabod/index", {
    title: "Dashboard - Wemabod Estate Data Capturing",
    user: req.user,
    data: data,
    notification: notification,
  });
};