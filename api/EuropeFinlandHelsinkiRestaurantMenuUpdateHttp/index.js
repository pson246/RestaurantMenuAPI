const axios = require("axios");
const cheerio = require("cheerio");
const { getContainer } = require("../containerProvider.js");
const { isEmpty } = require("../stringUtils.js");
const { containsPossibleEmail, containsPossiblePhoneNumber } = require("../menuContentValidator.js");

var pikkuRanskaLunchMenu = "";
var pikkuRanskaAlacarteMenu = "";
var updateStatus = "";
const EUROPE_FINLAND_HELSINKI_PIKKU_RANSKA = {
    NAME: "Pikku Ranska",
    LUNCH_PAGE_URL: "http://www.pikkuranska.com/lounas.htm",
    ALACARTE_PAGE_URL: "http://www.pikkuranska.com/alacarte.htm"
};
const STATUS_SUCCESS = "success";
const STATUS_ERROR = "error";

// One type of character + new line character
const hasTwoTypesOfCharacter = (str) => {
    const characters = str?.split("");
    const set = new Set(characters);    
    return (set?.size === 2);
};

const fetchPikkuRanskaMenu = async (menuSelector, pageUrl) => {
    var menu = "";
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
        $(menuSelector).map((i, element) => {       
            var menuItem = $(element)?.text();
            if (hasTwoTypesOfCharacter(menuItem)) {
                menuItem = menuItem?.replace(/\s/g, '');
            } else {
                menuItem = menuItem?.replace(/\s/g, ' ');
            }            
            if (menuItem !== '') {
                menuItems.push(menuItem);
            }                        
        });                
        menu = menuItems?.join("");
        menu = menu?.split(" ")?.filter((item) => item !== '')?.join(" ");
    } catch (error) {
        menu = "";
        console.log("Error fetching menu for restaurant Europe.Finland.Helsinki.PikkuRanska: ", error);
    } 
    return menu;
};

const fetchPikkuRanskaLunchMenu = async () => {
    pikkuRanskaLunchMenu = await fetchPikkuRanskaMenu("p.MsoNormal b i span",
        EUROPE_FINLAND_HELSINKI_PIKKU_RANSKA.LUNCH_PAGE_URL);   
};

const fetchPikkuRanskaAlacarteMenu = async () => {    
    pikkuRanskaAlacarteMenu = await fetchPikkuRanskaMenu("p.MsoNormal, p.MsoListParagraphCxSpFirst, p.MsoListParagraphCxSpMiddle, p.MsoListParagraphCxSpLast",
        EUROPE_FINLAND_HELSINKI_PIKKU_RANSKA.ALACARTE_PAGE_URL);
};

const updatePikkuRanskaMenu = async () => {
    try {
        var response = "";     
        if (containsPossiblePhoneNumber(pikkuRanskaLunchMenu) || containsPossibleEmail(pikkuRanskaLunchMenu) ||
            containsPossiblePhoneNumber(pikkuRanskaAlacarteMenu) || containsPossibleEmail(pikkuRanskaAlacarteMenu)) {
            console.log("Menu for restaurant Europe.Finland.Helsinki.PikkuRanska contains personal info.");            
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
                { op: "add", path: "/lunchMenu", value: pikkuRanskaLunchMenu },
                { op: "add", path: "/alacarteMenu", value: pikkuRanskaAlacarteMenu }
            ];
            const { resource: updated } = await container?.item(id, partitionKey)?.patch(operations);
            if (!isEmpty(updated?.id)) {
                response = STATUS_SUCCESS;
            } else {
                response = STATUS_ERROR;
            }
        }
    } catch (error) {
        console.log("Error updating menu for restaurant Europe.Finland.Helsinki.PikkuRanska: ", error);
        response = STATUS_ERROR;
    }
    return response;
};

module.exports = async function (context, req) {
    await fetchPikkuRanskaLunchMenu();
    await fetchPikkuRanskaAlacarteMenu();
    updateStatus = await updatePikkuRanskaMenu();
    context.res.json({
        data: [
            {
                "Europe.Finland.Helsinki.PikkuRanska": {
                    "status": updateStatus
                }
            }
        ]
    });
};