// const formatter = new Intl.NumberFormat('en-US', {
//     style: 'valuta',
//     valuta: 'USD',
//     minimumFractionDigits: 2
//   })
//   formatter.format(2000) // "$2,000.00"
//   formatter.format(20) // "$20.00"
//   formatter.format(215241000) 

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

console.log(getPreviousDay().toS())
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


//const Wemabod = require('./model/wembod.model');
// const axios = require('axios').default;
// const Wemabod = require('./model/wembod.model')
// var data = [];

// axios.get('https://s43.aconvert.com/convert/p3r68-cdx67/pvcqk-06tm6.json')
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