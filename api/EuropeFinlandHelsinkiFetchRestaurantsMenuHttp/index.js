const superagent = require("superagent");
const cheerio = require("cheerio");
const EUROPE_FINLAND_HELSINKI_PIKKU_RANSKA_LOUNAS_PAGE_URL = "http://www.pikkuranska.com/lounas.htm";
// lounas menu === lunch menu in Finnish
var pikkuRanskaLounasMenu = "";

const fetchPikkuRanskaLounasMenu = async (pageUrl) => {    
    try {
        const response = await superagent.get(pageUrl);        
        const $ = cheerio.load(response.text);
        const menuItems = [];
        $("p.MsoNormal b i span").map((i, element) => {                
            const menuItem = $(element).text().replace(/\uFFFD/g, "").trim();
            menuItems.push(menuItem);            
        });
        pikkuRanskaLounasMenu = menuItems.join();
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