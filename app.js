const fs = require('fs');
const data = fs.readFileSync('gallerydata.csv', 'utf8');
const request = require('request');

function getData() {
    request('https://spreadsheets.google.com/feeds/list/1OfeC0P83KzdXceXrmu193CXTlGei46qHddINkc7Tx5U/od6/public/values?alt=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let sortedData = parseSheetData(JSON.parse(body));
            writeToJSONFile(sortedData);
        }
    })
}

getData();

function parseSheetData(data) {
    let gsx = Object.keys(data.feed.entry[0]).filter(key => /^gsx\$/.test(key));
    return data.feed.entry.map(row => {
        let obj = {};
        gsx.forEach(key => {
            obj[key.split('gsx$').pop()] = row[key].$t
        })
        console.log(obj)
        return obj;
    });
}

function writeToJSONFile(sortedData) {
    let json = JSON.stringify(sortedData)
    fs.writeFile('public/assets/data/gallerydata.json', json, function (err) {
        if (err) return console.log(err);
    })

}

