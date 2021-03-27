const fs = require('fs');
const jsdom = require('jsdom');
const jquery = require('jquery')
const { JSDOM } = jsdom;
const cheerio = require('cheerio');

let rawdata = fs.readFileSync("supporters.json");
var supporters = JSON.parse(rawdata);
var html = fs.readFileSync("index.html");

const indexHTML = cheerio.load(html);
console.log(indexHTML.html());
indexHTML('a[href]').attr("href", "supporters/0002.html");
//indexHTML('a.href').text('supporters/0002.html');
console.log(indexHTML.html());
//fs.writeFile('index.html', indexHTML.html(), (error) => { console.log("Unable to add 0002.html") });
/*
for (var i = 0; i < supporters.length; i++) {
    var sup = supporters[i];
    fs.writeFile('./supporters/' + sup.Number + '.html', htmlContent, (error) => { console.log("Unable to add 0002.html") });
}
*/