var fs = require('fs');
const axios = require('axios').default;
const Plastic = require('./model/plastic.model')
var data = [];
const date = require('date-and-time');


axios.get('https://s43.aconvert.com/convert/p3r68-cdx67/imtyy-mhp75.json')
    .then(function(response) {
        response.data.forEach((e) => {
            data.push({
                retrieved_from: e['Plastics retrieved from'],
                date: e['Date'],
                zone: e['Zone'],
                plastic_size: e['Plastic Size'],
                tonnage: e['Tonnage'],
                product: e['field5'],
                volume_of_plastics: e['field6'],
                initial_content: e['field7'],
                manufacturer: e['field8'],
                userId: 1
            })
        });
        Plastic.bulkCreate(data).then((data) => {
            console.log('done');
        })
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    });


const now = new Date();
console.log(date.format(now, 'MM/DD/YYYY'));