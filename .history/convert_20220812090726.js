// var fs = require('fs');
// const axios = require('axios').default;
// const Plastic = require('./model/plastic.model')
// var data = [];
// const date = require('date-and-time');


// axios.get('')
//     .then(function(response) {
//         response.data.forEach((e) => {
//             const str = `${e['Date']}`;
//             const now = new Date(str);

//             data.push({
//                 retrieved_from: e['Plastics retrieved from'],
//                 date: date.format(now, 'YYYY/MM/DD'),
//                 zone: e['Zone'],
//                 plastic_size: e['Plastic Size'],
//                 tonnage: e['Tonnage'],
//                 product: e['Product'],
//                 volume_of_plastics: e['Volume of plastics (pcs)'],
//                 initial_content: e['Initial Content'],
//                 manufacturer: e['Manufacturers']
//             })
//         });
//         Plastic.bulkCreate(data).then((data) => console.log('done'));
//     }).catch((error) => console.log(error));


// const now = new Date('04/01/2022 00:00:00');
// console.log(date.format(now, 'YYYY/MM/DD'));


const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const axios = require("axios");

async function getToken() {
    const credentials = await msRestNodeAuth.loginWithUsernamePassword(
      'analysis@dechconsult.com',
      'Nigeria@96', {
        domain: ,
      },
    );
    // Mimic Azure CLI`s 'az account get-access-token' to avoid spn: prefix
    const { refreshToken } = (await credentials.getToken());
    const resp = await axios.request<{ access_token: string }>({
      method: 'POST',
      url: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/token`,
      data: qs.stringify({
        grant_type: 'refresh_token',
        client_id: credentials.clientId,
        resource: APPLICATION_ID,
        refresh_token: refreshToken,
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return resp.data.access_token;
  }


