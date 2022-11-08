const { check } = require("express-validator");
exports.LOGISTIC_HEADER = [
  "Id",
  "Consignor",
  "Phone No",
  "Item",
  "Date Of Order",
  "Pickup Address Street",
  "Pickup Address Area",
  "Pickup Time",
  "Consignee",
  "Consignee Phone No",
  "Delivery Address Str",
  "Delivery Address Area",
  "Delivery Time",
  "Mode Of Payment",
  "Rider",
  "Amount",
  "Payment Status",
  "Status",
];

exports.LOGISTIC_ATTRIBUTE = [
  "id",
  "consignor",
  "phone_number",
  "itemToBeDelivered",
  "dateOfOrder",
  "pickupaddress_str",
  "pickupaddress_area",
  "pickup_time",
  "consignee",
  "c_phone_number",
  "c_deliveryAddress_str",
  "c_deliveryAddress_area",
  "c_deliveryTime",
  "mode_of_pay",
  "rider",
  "amount_paid",
  "payment_status",
  "status",
];

exports.PLASTIC_HEADER = [
  "Id",
  "Retrieved From",
  "Date",
  "Plastic Size",
  "Tonnage",
  "Product",
  "Volume Of Plastics",
  "Initial Content",
  "Manufacturer",
];

exports.PLASTIC_ATTRIBUTE = [
  "id",
  "retrieved_from",
  "date",
  "plastic_size",
  "tonnage",
  "product",
  "volume_of_plastics",
  "initial_content",
  "manufacturer",
];

exports.SORT_HEADER = [
  "Id",
  "Date",
  "Sorted Pet Plastic Weight",
  "Other Sorted Pet Plastic Weight",
  "Sorted Data",
  "Other Sorted Data",
  "Sorted Color Cap Labels",
  "Other Sorted Color Cap Labels",
  "Units",
];

exports.SORT_ATTRIBUTES = [
  "id",
  "date",
  "plastic_weight",
  "other_plastic_weight",
  "cap_label",
  "other_cap_label",
  "plastic_color",
  "other_plastic_color"
  "unit",
];

exports.COMMODITY_HEADER = [
  "ID",
  "Purchased Date",
  "Purchased Cost",
  "Customer Name",
  "Phone Number",
  "Commodity",
  "Commodity Size",
  "Commodity Color",
  "Sales Date",
  "Sales Cost",
  "Delivery Street",
  "Purchasing Gender",
  "Mode of Payment",
  "Delivery Location",
  "Mode of Transaction",
  "Advertising Medium",
  "Status",
];

exports.COMMODITY_ATTRIBUTE = [
  "id",
  "purchased_date",
  "purchased_cost",
  "customer_name",
  "phone_no",
  "commodity",
  "commodity_size",
  "commodity_color",
  "sales_date",
  "sales_cost",
  "delivery_street",
  "purchasing_gender",
  "mode_payment",
  "delivery_location",
  "mode_transaction",
  "advertising_medium",
  "status",
];

exports.VALIDATE = [
  check("email", "Email is not valid").isEmail().normalizeEmail(),
  check("phone_number", "Phone Number is not valid").isLength({
    min: 11,
    max: 11,
  }),
  check("password", "Password is not valid")
    .isLength({ min: 6 })
    .normalizeEmail(),
];

exports.WEMABODS_ATTRIBUTE = [];

exports.WEMABODS_HEADER = [];