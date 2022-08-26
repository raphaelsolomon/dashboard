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

exports.logisticIndex = async (req, res, next) => {
  var listDataNo = [],
    listDataName = [];
  var activeCount = [],
    activeName = [];
  var customLoop = [];
  //NUMBER OF DELIVERIES COMPLETED
  const completed = await Logistics.count({
    where: { userId: req.user.id, status: "done" },
  });
  //TOTAL AMOUNT MADE FROM DELIVERIES
  const totalAmount = await Logistics.sum("amount_paid", {
    where: { userId: req.user.id },
  });
  //DAYS WITH THE MOST DELIVERIES
  const mostDelivery = await Logistics.max("createdAt", {
    where: { id: req.user.id },
  });
  //Total count of ride cancel
  const rideCancelled = await Logistics.count({
    where: {
      userId: req.user.id,
      status: {
        [Op.ne]: ["done"],
      },
    },
  });
  //list of deliveries with limit
  const limitLogist = await req.user.getLogistics({
    limit: 7,
    order: [["createdAt", "DESC"]],
  });
  //Amount Of Money Made Daily
  const moneyMadeDaily = await req.user.getLogistics({
    where: {
      amount_paid: {
        [Op.or]: {
          [Op.notLike]: "cancel",
          [Op.notLike]: "",
        },
      },
      dateOfOrder: {
        [Op.and]: {
          [Op.notLike]: "",
        },
      },
    },
  });

  moneyMadeDaily.forEach((e) => {
    if (e.dateOfOrder !== "" && e.amount_paid !== "cancel") {
      var exist = customLoop.findIndex(
        (element) => element.dateOfOrder === e.dateOfOrder
      );
      if (exist === -1) {
        customLoop.push(e);
        return;
      }
      customLoop[exist].amount_paid =
        Math.floor(customLoop[exist].amount_paid) + Math.floor(e.amount_paid);
    }
  });
  //Most Frequent Delivery Location
  const frequentDelivery = await req.user.getLogistics({
    attributes: [
      "c_deliveryAddress_area",
      [sequelize.fn("count", sequelize.col("c_deliveryAddress_area")), "count"],
    ],
    group: ["logistics.c_deliveryAddress_area"],
    raw: true,
    limit: 5,
    order: sequelize.literal("count DESC"),
  });
  frequentDelivery.forEach((e) => {
    listDataNo.push(e.count);
    listDataName.push(e.c_deliveryAddress_area);
  });
  //Most Active Rider
  const activeRider = await req.user.getLogistics({
    where: {
      status: {
        [Op.eq]: ["done"],
      },
    },
    attributes: [
      "rider",
      [sequelize.fn("count", sequelize.col("id")), "count"],
    ],
    group: ["logistics.rider"],
    raw: true,
    limit: 10,
    order: sequelize.literal("count DESC"),
  });

  activeRider.forEach((e) => {
    activeName.push(e.rider);
    activeCount.push(e.count);
  });

  var data = {
    completedDelivery: completed,
    totalAmount: currencyFormatter.format(`${totalAmount}`, { code: "NGN" }),
    mostDeliveryDay: date.format(new Date(mostDelivery), "YYYY-MM-DD"),
    totalRideCancelled: rideCancelled,
    tableLimit: limitLogist,
    moneyMadeDaily: customLoop
      .sort(
        (a, b) =>
          Math.floor(`${b.amount_paid}`) - Math.floor(`${a.amount_paid}`)
      )
      .splice(0, 4),
    deliveryLocation: {
      dataNo: listDataNo.join(","),
      dataName: listDataName.join(","),
    },
    mostActiveRider: {
      activeName: activeName.join(","),
      activeCount: activeCount.join(","),
    },
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
  return req.user.getLogistics().then((logistics) => {
    return res
      .status(200)
      .render("../logistics/table", {
        listItem: logistics,
        user: req.user,
        title: "Tables",
        notification: notification
      });
  });
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
