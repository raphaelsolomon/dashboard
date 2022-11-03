
var XLSX = require("xlsx");
const sequelize = require("../config/database.config");
const {
  PLASTIC_HEADER,
  PLASTIC_ATTRIBUTE,
} = require("../constant/value.const");
const Plastics = require("../model/plastic.model");
const date = require("date-and-time");
const Plastic = require("../model/plastic.model");
const Sorting = require("../model/sorting.model");
const path = require("path");
const resultPerPage = 20;

exports.plasticIndex = async (req, res, next) => {
  const plasticLimit = await require('./../chartQuery/plastic.query').getPlasticLimit(req);
  const totalWeight = await require('./../chartQuery/plastic.query').getTotalWeight(req);
  const totalBottle = await require('./../chartQuery/plastic.query').getTotalBottles(req);
  const totalZone = await require('./../chartQuery/plastic.query').getTotalZone(req);
  const totalProduct = await require('./../chartQuery/plastic.query').getTotalProducts(req);
  //=================================PHASE TWO==============================================
 
  const notification = await req.user.getNotifications({
    where: { isseen: false },
  });
  
  return res.status(200).render("../plastics/index", {
      user: req.user,
      totalWeight: totalWeight,
      totalBottle: totalBottle,
      totalZone: totalZone,
      totalProduct: totalProduct,
      tableLimit: plasticLimit,
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
  const count = await Plastics.count({ where: { userId: req.user.id } });
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
    const newQuery = await req.user.getPlastics({ limit: [startingLimit, resultPerPage],   order: [["createdAt", "DESC"]],});
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

exports.getSorts = async (req, res) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });

  return res.status(200).render("../plastics/sort", {
    title: 'Sorting',
    user: req.user,
    notification: notification
  })
}

exports.getSortTables = async (req, res) => {
  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });

  const count = await Sorting.count({ where: { userId: req.user.id } });
  if (count > 0) {
    const totalResults = count;
    const numbersOfPage = Math.ceil(totalResults / resultPerPage);
    let page = req.query.page ? Number(req.query.page) : 1
    if (page > numbersOfPage) {
      res.redirect(`/sort-table?page=${encodeURIComponent(numbersOfPage)}`)
    } else if (page < 1) {
      res.redirect(`/sort-table?page=${encodeURIComponent('1')}`)
    }
    //Deteremin the sql limit starting number
    const startingLimit = (page - 1) * resultPerPage;
    const newQuery = await req.user.getSorts({ limit: [startingLimit, resultPerPage],   order: [["createdAt", "DESC"]],});
    if (newQuery) {
      let iterator = (page - 5) < 1 ? 1 : page - 5;
      let endingLink = (iterator + 9) <= numbersOfPage ? (iterator + 9) : page + (numbersOfPage - page)

      if (endingLink < (page + 4)) {
        iterator -= (page + 4) - numbersOfPage;
      }
      return res.status(200).render("../plastics/sort_table", {
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
    return res.status(200).render("../logistics/sort_table", {
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
}

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
  const getTotalOfPlasticByManufactures = await require('./../chartQuery/plastic.query').getTotalOfPlasticByManufactures(req);
  const getVolumeOfPlastics = await require('./../chartQuery/plastic.query').getVolumeOfPlastics(req);
  const getPlasticsByZones = await require('./../chartQuery/plastic.query').getPlasticsByZones(req);
  const getCollectedPlasticsByMonths = await require('./../chartQuery/plastic.query').getCollectedPlasticsByMonths(req);

  const notification = await req.user.getNotifications({
    where: { isseen: false },
    raw: true,
  });

  return res
    .status(200)
    .render("../plastics/chart", {
      title: "Charts",
      user: req.user,
      getVolumeOfPlastics: getVolumeOfPlastics,
      getPlasticsByZones: getPlasticsByZones,
      getTotalOfPlasticByManufactures: getTotalOfPlasticByManufactures,
      getCollectedPlasticsByMonths: getCollectedPlasticsByMonths,
      notification: notification
    });
};

exports.getEdit = async (req, res, next) => {
  const notification = await req.user.getNotifications({ where: { isseen: false } });
  const plastic = await Plastic.findOne({ where: { id: req.query.id } });
  return res.status(200).render("../plastics/edit", { user: req.user, notification: notification, plastic, title: 'Edit Plastics' });

}

exports.update = async (req, res, next) => {
  const plastic = await Plastic.findOne({ where: { id: req.params.id } });
  await plastic.update(req.body);
  await plastic.save();
  return res.status(200).redirect(`/table`);
}

exports.editSort = async (req, res, next) => {
  return Sorting.findOne({where: {id: req.params.id}}).then((data) => {})
}
