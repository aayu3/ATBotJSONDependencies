const fs = require('fs');
const jsdom = require('jsdom');
const jquery = require('jquery')
const { JSDOM } = jsdom;
const cheerio = require('cheerio');

let rawdata = fs.readFileSync("weapons.json");
var weapons = JSON.parse(rawdata);
var html = fs.readFileSync("weapons.html");


/*
for (var i = 0; i < supporters.length; i ++) {
    supporters[i]["Preview"] = supporters[i].Unawakened.split("_")[0];
}
var newData = JSON.stringify(supporters);
fs.writeFile('supporters.json', newData, (error) => { console.log("Unable to add preview image") });
*/

const allWeaponsHTML = cheerio.load(html);
// Used to clear old data
allWeaponsHTML("#weapons").empty();
for (var i = 0; i < weapons.length; i ++) {
    var numString = (i+1).toString();
    numString = "0".repeat(4-numString.length) + numString; 
    allWeaponsHTML("#weapons").append("<li><a  target = \"_blank\" href=\"weapons_html/" + numString + ".html\">" + "<img src=\"weapon_images/" + weapons[i].Icon  + "\" width = \"5%\" alt=\"" + weapons[i].Name +"\"/>" +  weapons[i].Name + "</a></li>\n");
    let weaponHTML = WeaponJSONtoHTML(weapons[i]).toString();
    fs.writeFile("./weapons_html/" + numString + ".html", weaponHTML, (error) => {});
}
fs.writeFile('weapons.html', allWeaponsHTML.html(), (error) => { });


function WeaponJSONtoHTML(weapon) {
    var template = fs.readFileSync("./weapons_html/template.html");
    var templateHTML = cheerio.load(template);
    // Set meta tags
    templateHTML("#Name").text("No. " + weapon.Number + ": " + weapon.Name);
    templateHTML("#metaTitle").attr("content",weapon.Name);
    templateHTML("#metaDescription").attr("content","Wiki page for " + weapon.Name + ".");
    templateHTML("#metaImage").attr("content","https://aayu3.github.io/ATBotJSONDependencies/weapon_images/" + weapon.Icon);
    templateHTML("#ogTitle").attr("content",weapon.Name);
    templateHTML("#ogDescription").attr("content","Wiki page for " + weapon.Name + ".");
    templateHTML("#ogImage").attr("content","https://aayu3.github.io/ATBotJSONDependencies/weapon_images/" + weapon.Icon);
    templateHTML("#ogImage").attr("content","https://aayu3.github.io/ATBotJSONDependencies/weapon_images/" + weapon.Icon);
    templateHTML("#faviconInfo").attr("href", "../weapon_images/" + weapon.Icon);

    // Set rarity
    if (weapon.Rarity === "Rare") {
        templateHTML("#Rarity").attr("src","../wiki_icons/rare.png");
    } else if (weapon.Rarity === "SR") {
        templateHTML("#Rarity").attr("src","../wiki_icons/sr.png");
    } else if (weapon.Rarity === "UR") {
        templateHTML("#Rarity").attr("src","../wiki_icons/ur.png");
    }
    templateHTML("#Source").append(weapon.Source);
    // Set Unawakened, Awakened, and starting Video
    templateHTML("#WeaponImage").attr("src","../weapon_images/" + weapon.Icon);
    

    // Skill Formatting
    templateHTML("#Skill").text("Skill: ");
    templateHTML("#Skill").append("<u id = 'SkillName'>" + weapon.SkillName + "</u>");
    templateHTML("#SkillName").text(weapon.SkillName);
    if (weapon.SkillDescription) {
        var formatDesc = weapon.SkillDescription;
        formatDesc = formatDesc.split('[FFFF00FF]').join('<span style="color:#FFFF00FF";>');
        formatDesc = formatDesc.split('[-]').join('</span>');
        formatDesc = formatDesc.split('[6BEB00FF]').join('<span style="color:#6BEB00FF";>');
        formatDesc = formatDesc.split('[FFA500FF]').join('<span style="color:#FFA500FF";>');
        templateHTML("#SkillText").append(formatDesc);
    } else {
        templateHTML("#SkillText").text(weapon.SkillDescription);
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
