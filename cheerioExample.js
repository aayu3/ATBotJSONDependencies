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
for (var i = 0; i < supporters.length; i ++) {
    var numString = (i+1).toString();
    numString = "0".repeat(4-numString.length) + numString; 
    indexHTML('p').append("<a href=\"supporters/" + numString + ".html\">" + supporters[i].Name + "</a><br>\n");
}

function JSONtoHTML(json) {
    var basicTemplate = `<html><head><title>ATBotJSON Dependencies</title>
    </head>
    <body>
    <p>Supporters:</p>
    <a href="../index.html">Home</a>  
    </body>
    </html>`
}

//indexHTML('a.href').text('supporters/0002.html');

fs.writeFile('index.html', indexHTML.html(), (error) => { console.log("Unable to add 0002.html") });
/*
for (var i = 0; i < supporters.length; i++) {
    var sup = supporters[i];
    fs.writeFile('./supporters/' + sup.Number + '.html', htmlContent, (error) => { console.log("Unable to add 0002.html") });
}
*/
