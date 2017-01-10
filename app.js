const fs = require('fs');
const data = fs.readFileSync('gallerydata.csv', 'utf8');
const request = require('request');

function getData() {
    request('https://spreadsheets.google.com/feeds/list/1OfeC0P83KzdXceXrmu193CXTlGei46qHddINkc7Tx5U/od6/public/values?alt=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    parseSheetData(JSON.parse(body)); 
  }
})
}

getData();

function parseSheetData(data) {
    console.log(data.feed);

}




// function convertData(input) {
//     const dataArray = input.split('\n');
//     const titlesArray = dataArray.shift().split(',');
//     const mappedData = mapData(titlesArray, dataArray);

//     fs.writeFile('saved-data.json', JSON.stringify(mappedData, null, 2), (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('file saved');
//         }
//     })
// }

// function mapData(titles, data) {
//     return data.map((row) => {
//         let rowData = row.split(',');
//         let obj = {};

//         titles.forEach((prop, index) => {
//             obj[prop] = rowData[index]
//         });
        
//         return obj;
//     });
// }

// convertData(data);