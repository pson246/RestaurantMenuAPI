const { PlaywrightCrawler } = require('crawlee');

const PIKKU_RANSKA_LOUNAS_PAGE_URL = "http://www.pikkuranska.com/lounas.htm";

module.exports = async function (context, req) {

    var lounasMenu = "";

    const crawler = new PlaywrightCrawler({        
        requestHandler: async ({ page, request, enqueueLinks }) => {            
            console.log(`Processing: ${request.url}`);
            switch (request.url) {
                case PIKKU_RANSKA_LOUNAS_PAGE_URL:
                    lounasMenu = (await page.locator("p.MsoNormal b i span").allInnerTexts()).toString().replace(/\s/g, "").trim();
                    break;
            }                
        },
        maxRequestsPerCrawl: 50    
    });
    
    await crawler.run(["http://www.pikkuranska.com/lounas.htm"]);

    const pikkuRanskaMenu = {
        restaurantName: "Pikku Ranska",
        "lounasMenu": lounasMenu
    }

    context.res.json({
        "PikkuRanska": pikkuRanskaMenu
    });

}