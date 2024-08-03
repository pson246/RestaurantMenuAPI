const { getContainer } = require("../containerProvider.js");

module.exports = async function (context, req) {
  const container = await getContainer();
  const restaurantsQuery = "SELECT * from c";
  const { resources } = await container.items.query(restaurantsQuery).fetchAll();
  const restaurants = [];
  for (const resource of resources) {    
    const menu = resource?.menu;
    const shortMenu = (menu && menu?.trim() !== "") ? `${menu?.substring(0, 18)} ...` : "";
    const restaurant = {
      ...resource,
      ...{        
        short_menu: shortMenu
      }
    };
    restaurants.push(restaurant);    
  }
  context.res.json({
    data: restaurants,
    total: restaurants.length
  });
};