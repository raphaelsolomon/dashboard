// function days(current) {
//   var week = new Array();
//   // Starting Monday not Sunday 
//   var first = ((current.getDate() - current.getDay()) + 1);
//   for (var i = 0; i < 7; i++) {
//     week.push(
//       new Date(current.setDate(first++))
//     );
//   }
//   return week;
// }

// var input = new Date(2023, 1, 12);
// console.log('input: %s', input);

// var result = days(input);
// console.log(result.map(d => d.toString()));




// function getWeeksInMonth(year, month) {
//   const weeks = [],
//     firstDate = new Date(year, month, 1),
//     lastDate = new Date(year, month + 1, 0),
//     numDays = lastDate.getDate();

//   let dayOfWeekCounter = firstDate.getDay();

//   for (let date = 1; date <= numDays; date++) {
//     if (dayOfWeekCounter === 0 || weeks.length === 0) {
//       weeks.push([]);
//     }
//     weeks[weeks.length - 1].push(date);
//     dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
//   }

//   return weeks
//     .filter((w) => !!w.length)
//     .map((w) => ({
//       start: w[0],
//       end: w[w.length - 1],
//       dates: w,
//     }));
// }

// console.log(getWeeksInMonth(2023, 0))




// let promises = [];

// [1, 2, 4, 5, 6, 7, 8].forEach((e) => {
//   promises.push(
//     new Promise((resolve, reject) => {
//       e = e + 5;
//       setTimeout(resolve(e), 1000);
//     })
//   );
// });

// Promise.all(promises).then((results) => {
//   console.log(results);
//   process.exit(0);
// });



// let data = {a: 1, b : 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8};
// data = {};
// console.log(data);
// const date = new Date();
// console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`)
// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'valuta',
//     valuta: 'USD',
//     minimumFractionDigits: 2
//   })
//   formatter.format(2000) // "$2,000.00"
//   formatter.format(20) // "$20.00"
//   formatter.format(215241000)
//`SELECT * FROM users where createdAt BETWEEN '${getPreviousDay().toISOString().substring(0, getPreviousDay().toISOString().indexOf('T'))} 00:00:00' AND '${date.toISOString().substring(0, date.toISOString().indexOf('T'))} 23:59:59'`
// function getPreviousDay(number, date = new Date()) {
//   const previous = new Date(date.getTime());
//   previous.setDate(date.getDate() - number);

//   return previous;
// }
// const date = new Date();

// console.log()
// // var fs = require('fs');
// // const axios = require('axios').default;
// // const Plastic = require('./model/plastic.model')
// // var data = [];
// // const date = require('date-and-time');

// // axios.get('')
// //     .then(function(response) {
// //         response.data.forEach((e) => {
// //             const str = `${e['Date']}`;
// //             const now = new Date(str);

// //             data.push({
// //                 retrieved_from: e['Plastics retrieved from'],
// //                 date: date.format(now, 'YYYY/MM/DD'),
// //                 zone: e['Zone'],
// //                 plastic_size: e['Plastic Size'],
// //                 tonnage: e['Tonnage'],
// //                 product: e['Product'],
// //                 volume_of_plastics: e['Volume of plastics (pcs)'],
// //                 initial_content: e['Initial Content'],
// //                 manufacturer: e['Manufacturers']
// //             })
// //         });
// //         Plastic.bulkCreate(data).then((data) => console.log('done'));
// //     }).catch((error) => console.log(error));

// // const now = new Date('04/01/2022 00:00:00');
// // console.log(date.format(now, 'YYYY/MM/DD'));

// const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
// const axios = require("axios").default;

// async function getToken() {
//     const TENANT_ID = 'fddaf1bb-5d24-4976-b731-0eb1a31e7b6c';
//     const credentials = await msRestNodeAuth.loginWithUsernamePassword(
//       'analysis@dechconsult.com',
//       'Nigeria@96', {
//         domain: TENANT_ID,
//       },
//     );
//     // Mimic Azure CLI`s 'az account get-access-token' to avoid spn: prefix
//     const { refreshToken } = (await credentials.getToken());

//         console.log(credentials)
//   }

//   getToken();

//======Corrected
// const Wemabod = require('./model/wembod.model');
// const axios = require('axios').default;
// var data = [];

// axios.get('https://s5.aconvert.com/convert/p3r68-cdx67/rbvvu-re0op.json')
// .then(function (response) {
//     response.data.forEach((e) => {
//         if (`${e['DAY AND TIME']}` !== 'DATE') {

//             const str = `${e['DAY AND TIME']}`;
//             const [month, day, year] = str.split('/');
//             const newDate = `${year}-${month}-${day}`;

//             data.push({
//                 date: newDate,
//                 from_time: `${e['field2'].toString().split(' - ')[0]}:00`,
//                 to_time: `${e['field2'].toString().split(' - ')[1]}:00`,
//                 movement_by_vehicle_resident: e['MOVEMENT BY VEHICLE'],
//                 movement_by_vehicle_staff: e['field4'],
//                 movement_by_vehicle_visitor: e['field5'],
//                 movement_by_vehicle_cab_service: e['field6'],
//                 movement_by_vehicle_delivery: e['field7'],

//                 police_matters_all_npf: e['POLICE MATTERS'],
//                 man_matters: e['MAN MATTERS'],
//                 hospital_matters: e['HOSPITAL MATTERS'],

//                 street_visited_adeojo: e['STREETS VISITED'],
//                 street_visited_eleruwa: e['field12'],
//                 street_visited_olorunnimbe: e['field13'],
//                 street_visited_ojora: e['field14'],
//                 street_visited_eric_moore: e['field15'],

//                 movement_by_ped_staff: e['MOVEMENT BY PEDESTRIANS'],
//                 movement_by_ped_visitor: e['field17'],
//                 movement_by_ped_resident: e['field18'],
//             })
//         }
//     });
//     // console.log(data.length);
//     // console.log(data)
//     Wemabod.bulkCreate(data).then((data) => {
//         console.log('done');
//     })
// }).catch(function (error) {
//     console.log(error);
// });

// ACCESS TO TEN(10) SHORTLISTED STAFF
// ACCESS TO UNLIMITED CHOICE OF CANDIDATE
// ACCESS TO INTERVIEW TEN(1O) CANDIDATES
// ACCESS TO ONLINE TEST/INTERVIEW
// FREE ACCESS TO CANDIDATE ANYWHERE IN THE WORLD

// ACCESS TO TWENTY(20) SHORTLISTED STAFFS
// ACCESS TO UNLIMITED CHOICE OF CANDIDATE
// ACCESSTO INTERVIEW TWENTY(20) CANDIDATES
// ACCESS TO ONLINE TEST/INTERVIEW
// FREE ACCESS TO CANDIDATE ANYWHERE INTHE WORLD

// UNLIMITED ACCESS TO SHORTLISTED STAFES
// UNLIMITED ACCESS TO CHOICE OF CANDIDATES
// UNLIMITED ACCESS TO TEST/INTERVIEW CANDIDATES
// UNLIMITED ACCESS TO CANDIDATES ANYWHERE IN THE WORLD

//require('./chartQuery/commodity.query').getProfitByDay(null);


const fs = require('fs');
const path = require('path');
const Crushing = require('./model/crush.model');

const data = fs.readFileSync(path.join(__dirname, '/crush.json'));
const array = JSON.parse(data.toString())


array.forEach(async (element) => {
    Crushing.create({machine: element['machine '], flakes: element['flakes '], qty: element['qty '], operator: element['operator ']})
});