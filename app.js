const fs = require('fs');
const jsdom = require('jsdom');
const jquery = require('jquery')
const { JSDOM } = jsdom;

let rawdata = fs.readFileSync("supporters.json");
var supporters = JSON.parse(rawdata);
var html = fs.readFileSync("index.html");
var indexWindow = new JSDOM(html, {
    // standard options:  disable loading other assets
    // or executing script tags
    url: "https://aayu3.github.io/ATBotJSONDependencies/",
    FetchExternalResources: false,
    ProcessExternalResources: false,
    MutationEvents: false,
    QuerySelector: false
}).defaultView;

var indexHTML = new jquery(indexWindow);
indexHTML('body').append('<a href="supporters/0002.html">Homura</a>');
console.log( window.document.doctype + window.document.innerHTML );
//fs.writeFile('index.html', indexDom.serialize(), (error) => { console.log("Unable to add 0002.html") });
/*
for (var i = 0; i < supporters.length; i++) {
    var sup = supporters[i];
    fs.writeFile('./supporters/' + sup.Number + '.html', htmlContent, (error) => { console.log("Unable to add 0002.html") });
}
*/