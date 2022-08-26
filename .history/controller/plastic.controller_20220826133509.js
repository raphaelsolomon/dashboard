const { Op } = require("sequelize");
var XLSX = require("xlsx");
const sequelize = require("../config/database.config");
const {
  PLASTIC_HEADER,
  PLASTIC_ATTRIBUTE,
} = require("../constant/value.const");
const Plastics = require("../model/plastic.model");
const date = require("date-and-time");
const Plastic = require("../model/plastic.model");
const resultPerPage = 30;

exports.plasticIndex = async (req, res, next) => {
  const limitPlastic = await req.user.getPlastics({
    limit: 7,
    order: [["date", "DESC"]],
  });


  var data = {
    tableLimit: limitPlastic,
  };
  const notification = await req.user.getNotifications({
    where: { isseen: false },
  });
  return res
    .status(200)
    .render("../plastics/index", {
      user: req.user,
      data: data,
      title: "Plastics",
      notification: notification,
    });
};

exports.addItem = async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  return res
    .status(200)
    .render("../plastics/add", {
      title: "Plastics",
      user: req.user,
      title: "Add Items",
      notification: notification
    });
};

exports.getTable = async (req, res, next) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });
  const plastics = await req.user.getPlastics();
  const totalResults = plastics.length;
  const numbersOfPage = Math.ceil(totalResults / resultPerPage);
  let page = req.query.page ? Number(req.query.page) : 1
  if (page > numbersOfPage) {
    res.redirect(`/table?page=${encodeURIComponent(numbersOfPage)}`)
  } else if (page < 1) {
    res.redirect(`/table?page=${encodeURIComponent('1')}`)
  }
  //Deteremin the sql limit starting number
  const startingLimit = (page - 1) * resultPerPage;
  const newQuery = await req.user.getPlastics({ limit: [startingLimit, resultPerPage] });
  if (newQuery) {
    let iterator = (page - 5) < 1 ? 1 : page - 5;
    let endingLink = (iterator + 9) <= numbersOfPage ? (iterator + 9) : page + (numbersOfPage - page)

    if (endingLink < (page + 4)) {
      iterator -= (page + 4) - numbersOfPage;
    }
    return res.status(200).render("../plastics/table", {
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

  return res
    .status(200)
    .render("../plastics/chart", {
      title: "Charts",
      user: req.user,
      notification: notification
    });
};

exports.getEdit = async (req, res, next) => {
  const notification = await req.user.getNotifications({where: {isseen: false}});
  const plastic = await Plastic.findOne({where: {id: req.params.id}});
  return res.status(200).sendFile(path.join(__dirname, '../views/plastics/form.html'));
  //return res.status(200).render("../plastics/add", {user: req.user, notification: notification, plastic, title: 'Edit Plastics'});

}

exports.update = async (req, res, next) => {
  const plastic = await Plastic.findOne({where: {id: req.params.id}});
  await plastic.update(req.body);
  await plastic.save();
  return res.status(200).redirect(`/details/${plastic.id}`);
}
