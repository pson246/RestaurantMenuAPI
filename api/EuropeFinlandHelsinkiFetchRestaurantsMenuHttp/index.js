const axios = require("axios");
const cheerio = require("cheerio");
// lounas menu === lunch menu in Finnish
var pikkuRanskaLounasMenu = "";
const EUROPE_FINLAND_HELSINKI_PIKKU_RANSKA_LOUNAS_PAGE_URL = "http://www.pikkuranska.com/lounas.htm";

const hasOneTypeOfCharacter = (str) => {
    const characters = str.split("");
    const set = new Set(characters);
    // one type of character + new line character
    return (set.size === 2);
};

const fetchPikkuRanskaLounasMenu = async (pageUrl) => {    
    try {
        const response = await axios.request({
            method: "GET",
            url: pageUrl,
            responseType: "arraybuffer",
            responseEncoding: "binary"
        });
        
        const responseText = response.data.toString("binary");   
        const $ = cheerio.load(responseText, {decodeEntities: true});
        const menuItems = [];
        $("p.MsoNormal b i span").map((i, element) => {            
            var menuItem = $(element).text();
            if (hasOneTypeOfCharacter(menuItem)) {
                menuItem = menuItem.replace(/\s/g, '');
            } else {
                menuItem = menuItem.replace(/\s/g, ' ');
            }            
            if (menuItem !== '') {
                menuItems.push(menuItem);
            }                        
        });                
        pikkuRanskaLounasMenu = menuItems.join("");
        pikkuRanskaLounasMenu = pikkuRanskaLounasMenu.split(" ").filter((item) => item !== '').join(" ");        
    } catch (error) {
        console.error("Error fetching lounas menu for restaurant Europe.Finland.Helsinki.PikkuRanska: ", error);
    }    
};

module.exports = async function (context, req) {    
    await fetchPikkuRanskaLounasMenu(EUROPE_FINLAND_HELSINKI_PIKKU_RANSKA_LOUNAS_PAGE_URL);
    context.res.json({
        "Europe.Finland.Helsinki.PikkuRanska": {
            "lounasMenu": pikkuRanskaLounasMenu
        }
    });
}