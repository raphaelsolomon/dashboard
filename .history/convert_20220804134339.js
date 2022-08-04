var fs = require('fs');
const axios = require('axios').default;
const Plastic = require('./model/plastic.model')
var data = [];
const date = require('date-and-time');


axios.get('https://s5.aconvert.com/convert/p3r68-cdx67/e1s2u-ekpux.json')
    .then(function(response) {
        response.data.forEach((e) => {
            const str = `${e['Date']}`;
            const [month, day, year] = str.split('/');
            const newDate = `${year}-${month}-${day}`;

            data.push({
                retrieved_from: e['Plastics retrieved from'],
                date: newDate,
                zone: e['Zone'],
                plastic_size: e['Plastic Size'],
                tonnage: e['Tonnage'],
                product: e['Product'],
                volume_of_plastics: e['Volume of plastics (pcs)'],
                initial_content: e['Initial Content'],
                manufacturer: e['Manufacturers']
            })
        });
        Plastic.bulkCreate(data).then((data) => console.log('done'));
    }).catch((error) => console.log(error));


const now = new Date();
console.log(date.format(now, 'MM/DD/YYYY'));