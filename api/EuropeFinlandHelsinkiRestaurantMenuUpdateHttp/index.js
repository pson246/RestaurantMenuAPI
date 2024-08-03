const axios = require("axios");
const cheerio = require("cheerio");
const { getContainer } = require("../containerProvider.js");
const { containsPossibleEmail, containsPossiblePhoneNumber } = require("../menuContentValidator.js");
// lounas menu === lunch menu in Finnish
var pikkuRanskaLounasMenu = "";
var updateStatus = "";
const EUROPE_FINLAND_HELSINKI_PIKKU_RANSKA = {
    NAME: "Pikku Ranska",
    LOUNAS_PAGE_URL: "http://www.pikkuranska.com/lounas.htm"
};
const STATUS_SUCCESS = "success";
const STATUS_ERROR = "error";

const hasOneTypeOfCharacter = (str) => {
    const characters = str?.split("");
    const set = new Set(characters);
    // one type of character + new line character
    return (set?.size === 2);
};

const fetchPikkuRanskaLounasMenu = async (pageUrl) => {    
    try {
        const response = await axios?.request({
            method: "GET",
            url: pageUrl,
            responseType: "arraybuffer",
            responseEncoding: "binary"
        });        
        const responseText = response?.data?.toString("binary");   
        const $ = cheerio?.load(responseText, {decodeEntities: true});
        const menuItems = [];
        $("p.MsoNormal b i span").map((i, element) => {            
            var menuItem = $(element)?.text();
            if (hasOneTypeOfCharacter(menuItem)) {
                menuItem = menuItem?.replace(/\s/g, '');
            } else {
                menuItem = menuItem?.replace(/\s/g, ' ');
            }            
            if (menuItem !== '') {
                menuItems.push(menuItem);
            }                        
        });                
        pikkuRanskaLounasMenu = menuItems?.join("");
        pikkuRanskaLounasMenu = pikkuRanskaLounasMenu?.split(" ")?.filter((item) => item !== '')?.join(" ");          
    } catch (error) {
        console.log("Error fetching lounas menu for restaurant Europe.Finland.Helsinki.PikkuRanska: ", error);
    }    
};

const updatePikkuRanskaLounasMenu = async (menu) => {
    try {
        var response = "";        
        if (containsPossiblePhoneNumber(menu) || containsPossibleEmail(menu)) {
            console.log("Lounas menu for restaurant Europe.Finland.Helsinki.PikkuRanska contains personal info.");            
            response = STATUS_ERROR;
        } else {
            const container = await getContainer();
            const restaurantQuery = {
                query: `SELECT * FROM ${container.id} f WHERE f.properties.name = @name`,
                parameters: [{
                    name: "@name",
                    value: EUROPE_FINLAND_HELSINKI_PIKKU_RANSKA.NAME,
                }],
            };
            const { resources } = await container?.items?.query(restaurantQuery)?.fetchAll();
            const restaurant = resources[0];
            const id = restaurant?.id;
            const partitionKey = restaurant?.partitionkeyvalue?.restaurantid;
            const operations = [
                { op: "add", path: '/menu', value: menu }
            ];
            const { resource: updated } = await container?.item(id, partitionKey)?.patch(operations);
            if (updated?.partitionkeyvalue?.restaurantid && updated?.partitionkeyvalue?.restaurantid?.toString()?.trim() !== "") {
                response = STATUS_SUCCESS;
            } else {
                response = STATUS_ERROR;
            }
        }
    } catch (error) {
        console.log("Error updating lounas menu for restaurant Europe.Finland.Helsinki.PikkuRanska: ", error);
        response = STATUS_ERROR;
    }
    return response;
};

module.exports = async function (context, req) {    
    await fetchPikkuRanskaLounasMenu(EUROPE_FINLAND_HELSINKI_PIKKU_RANSKA.LOUNAS_PAGE_URL);
    updateStatus = await updatePikkuRanskaLounasMenu(pikkuRanskaLounasMenu);
    context.res.json({
        data: [
            {
                "Europe.Finland.Helsinki.PikkuRanska": {            
                    "status": updateStatus
                }
            }
        ]
    });
}