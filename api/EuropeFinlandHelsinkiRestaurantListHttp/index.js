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
    const name = resource?.properties?.name;
    var shortName = "";
    var shortMenu = "";
    var chartSeriesValue = 0;
    try {
      shortMenu = (!isEmpty(menu)) ? `${menu?.substring(0, 15)} ...` : "";
      shortName = (!isEmpty(name)) ? `${name?.substring(0, 10)} ...` : "";
      chartSeriesValue = (!isEmpty(menu)) ? 1 : 0;
    } catch (e) {
      shortMenu = "";
      shortName = "";
      chartSeriesValue = 0;
    }    
    const restaurant = {
      ...resource,
      ...{        
        short_name: shortName,
        short_menu: shortMenu,        
        chart_series_value: chartSeriesValue
      }
    };
    restaurants.push(restaurant);    
  }
  context.res.json({
    data: restaurants,
    total: restaurants.length
  });
};