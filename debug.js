const fs = require('fs');

let rawdata = fs.readFileSync("supporters.json");
var supporters = JSON.parse(rawdata);

for (var i = 0; i < supporters.length; i++) {
    supporters[i].Status = "Released";
}
var updatedSupporters = JSON.stringify(supporters);
fs.writeFile('updatedSupporters.json', updatedSupporters, (error) => { console.log("Unable to add allSupportersHTML.html") });