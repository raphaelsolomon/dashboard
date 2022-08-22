exports.LOGISTIC_HEADER = ['Id', 'Consignor', 'Phone No', 'Item', 'Date Of Order', 'Pickup Address Street', 'Pickup Address Area', 'Pickup Time',
    'Consignee', 'Consignee Phone No', 'Delivery Address Str', 'Delivery Address Area', 'Delivery Time', 'Mode Of Payment', 'Rider',
    'Amount', 'Payment Status', 'Status'
];

exports.LOGISTIC_ATTRIBUTE = [
    'id', 'consignor', 'phone_number', 'itemToBeDelivered', 'dateOfOrder', 'pickupaddress_str', 'pickupaddress_area',
    'pickup_time', 'consignee', 'c_phone_number', 'c_deliveryAddress_str', 'c_deliveryAddress_area', 'c_deliveryTime',
    'mode_of_pay', 'rider', 'amount_paid', 'payment_status', 'status'
];

exports.PLASTIC_HEADER = ['Id', 'Retrieved From', 'Date', 'Plastic Size', 'Tonnage', 'Product', 'Volume Of Plastics', 'Initial Content',
    'Manufacturer'
];

exports.PLASTIC_ATTRIBUTE = [
    'id', 'retrieved_from', 'date', 'plastic_size', 'tonnage', 'product', 'volume_of_plastics',
    'initial_content', 'manufacturer'
];


exports.COMMODITY_HEADER = [

];

exports.COMMODITY_ATTRIBUTE = [
    'id', 'purchased_date', 'purchased_cost', 'customer_name', 'phone_no', 'commodity', 'commodity_size', 'commodity_color', 'sales_date',
    'sales_cost', 'delivery_street', 'purchasing_gender', 'mode_payment', 'delivery_location', 'mode_transaction', ''
];