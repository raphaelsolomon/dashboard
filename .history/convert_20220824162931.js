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