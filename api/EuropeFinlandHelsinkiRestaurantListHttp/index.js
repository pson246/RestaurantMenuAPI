const { getContainer } = require("../containerProvider.js");

const isEmpty = (str) => {
  return (!str || str?.trim() === "");
};

module.exports = async function (context, req) {
  const container = await getContainer();
  const restaurantsQuery = "SELECT * from c";
  const { resources } = await container.items.query(restaurantsQuery).fetchAll();
  const restaurants = [];
  for (const resource of resources) {            
    const menu = resource?.menu;    
    var shortMenu = "";    
    try {
      shortMenu = (!isEmpty(menu)) ? `${menu?.substring(0, 10)} ...` : "";            
    } catch (e) {
      shortMenu = "";            
    }    
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