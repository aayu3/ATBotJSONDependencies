const fs = require('fs');
const jsdom = require('jsdom');
const jquery = require('jquery')
const { JSDOM } = jsdom;
const cheerio = require('cheerio');

let rawdata = fs.readFileSync("supporters.json");
var supporters = JSON.parse(rawdata);
var html = fs.readFileSync("supporters.html");


/*
for (var i = 0; i < supporters.length; i ++) {
    supporters[i]["Preview"] = supporters[i].Unawakened.split("_")[0];
}
var newData = JSON.stringify(supporters);
fs.writeFile('supporters.json', newData, (error) => { console.log("Unable to add preview image") });
*/

const allSupportersHTML = cheerio.load(html);
// Used to clear old data
allSupportersHTML("#supporters").empty();
for (var i = 0; i < supporters.length; i ++) {
    var numString = (i+1).toString();
    numString = "0".repeat(4-numString.length) + numString; 
    allSupportersHTML("#supporters").append("<li><a  target = \"_blank\" href=\"supporters_html/" + numString + ".html\">" + "<img src=\"supporter_images/" + supporters[i].Preview  + ".png\" width = \"5%\" alt=\"" + supporters[i].Name +"\"/>" +  supporters[i].Name + "</a></li>\n");
    let supporterHTML = SupporterJSONtoHTML(supporters[i]).toString();
    fs.writeFile("./supporters_html/" + numString + ".html", supporterHTML, (error) => { console.log("Unable to add " + numString +".html")});
}
fs.writeFile('supporters.html', allSupportersHTML.html(), (error) => { console.log("Unable to add allSupportersHTML.html") });


function SupporterJSONtoHTML(supporter) {
    var template = fs.readFileSync("./supporters_html/template.html");
    var templateHTML = cheerio.load(template);
    // Set meta tags
    templateHTML("#Name").text("No. " + supporter.Number + ": " + supporter.Name);
    templateHTML("#metaTitle").attr("content",supporter.Name);
    templateHTML("#metaDescription").attr("content","Wiki page for " + supporter.Name + ".");
    templateHTML("#metaImage").attr("content","https://aayu3.github.io/ATBotJSONDependencies/supporter_images/" + supporter.Preview + ".png");
    templateHTML("#ogTitle").attr("content",supporter.Name);
    templateHTML("#ogDescription").attr("content","Wiki page for " + supporter.Name + ".");
    templateHTML("#ogImage").attr("content","https://aayu3.github.io/ATBotJSONDependencies/supporter_images/" + supporter.Preview + ".png");
    templateHTML("#ogImage").attr("content","https://aayu3.github.io/ATBotJSONDependencies/supporter_images/" + supporter.Preview + ".png");
    templateHTML("#faviconInfo").attr("href", "../supporter_images/" + supporter.Preview + ".png");
    // Set type
    if (supporter.Type === "Protect") {
        templateHTML("#Type").attr("src","../wiki_icons/protect.png");
    } else if (supporter.Type === "Suppress") {
        templateHTML("#Type").attr("src","../wiki_icons/suppress.png");
    } else if (supporter.Type === "Assist") {
        templateHTML("#Type").attr("src","../wiki_icons/assist.png");
    }

    // Set rarity
    if (supporter.Rarity === "R") {
        templateHTML("#Rarity").attr("src","../wiki_icons/rare.png");
    } else if (supporter.Rarity === "SR") {
        templateHTML("#Rarity").attr("src","../wiki_icons/sr.png");
    } else if (supporter.Rarity === "UR") {
        templateHTML("#Rarity").attr("src","../wiki_icons/ur.png");
    }
    templateHTML("#Source").append(supporter.Source);
    templateHTML("#Status").append(supporter.Status);
    // Set Unawakened, Awakened, and starting Video
    templateHTML("#UnawakenedButton").attr("onclick","document.getElementById('SupporterImage').src='../supporter_images/" + supporter.Unawakened + ".png'");
    templateHTML("#AwakenedButton").attr("onclick","document.getElementById('SupporterImage').src='../supporter_images/" + supporter.Awakened + ".png'");
    templateHTML("#SupporterImage").attr("src","../supporter_images/" + supporter.Unawakened + ".png");
    if (supporter.Rarity ==="R") {
        
    } else {
        templateHTML("#IntimacyImage").attr("src","../intimacy_images/Supporter_" + supporter.Unawakened + ".png");
    }
    
    // Subskill Formatting
    if (supporter.SubSkillName) {
        templateHTML("#SubSkill").text("Sub Skill: ");
        templateHTML("#SubSkill").append("<u id = 'SubSkillName'>" + supporter.SubSkillName + "</u>");
        templateHTML("#SubSkillName").text(supporter.SubSkillName);
        templateHTML("#SubSkillText").text(supporter.SubSkill);
    }

    // Check for Main Skill then format it
    if (supporter.MainSkillName) {
        templateHTML("#LeadSkill").text("Lead Skill: ");
        templateHTML("#LeadSkill").append("<u id = 'LeadSkillName'>" + supporter.MainSkillName +  "</u>");
        if (supporter.CD && supporter.MainSkillPassive) {
            templateHTML("#LeadSkill").append(" CD: " + supporter.CD + "s");
            templateHTML("#CD").text("CD:" + supporter.CD + "s");
            templateHTML("#ActiveSkill").text("Active Skill: ");
            templateHTML("#ActiveSkillText").text(supporter.MainSkillActive);
            templateHTML("#PassiveSkill").text("Passive Skill: ");
            templateHTML("#PassiveSkillText").text(supporter.MainSkillPassive);
        } else {
            if (supporter.CD) {
                templateHTML("#LeadSkill").append(" CD: " + supporter.CD + "s");
                templateHTML("#CD").text("CD:" + supporter.CD + "s");
                templateHTML("#ActiveSkillText").text(supporter.MainSkillActive);
            }
            if (supporter.MainSkillPassive) {
                templateHTML("#PassiveSkillText").text(supporter.MainSkillPassive);
            }
        }
        
    }

    return templateHTML.html();
}


//indexHTML('a.href').text('supporters/0002.html');

//fs.writeFile('index.html', indexHTML.html(), (error) => { console.log("Unable to add 0002.html") });
/*
for (var i = 0; i < supporters.length; i++) {
    var sup = supporters[i];
    fs.writeFile('./supporters/' + sup.Number + '.html', htmlContent, (error) => { console.log("Unable to add 0002.html") });
}
*/