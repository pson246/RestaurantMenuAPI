const { getContainer } = require("../containerProvider.js");

const isEmpty = (str) => {
  return (!str || str?.trim() === "");
};

module.exports = async function (context, req) {
  const container = await getContainer();
  const restaurantsQuery = "SELECT * from c";
  const { resources } = await container.items.query(restaurantsQuery).fetchAll();
  const restaurants = [];
  var count = 0;
  for (const resource of resources) {        
    count++;
    const menu = resource?.menu;
    var shortMenu = "";
    var chartSeriesValues = [];
    try {
      shortMenu = (!isEmpty(menu)) ? `${menu?.substring(0, 18)} ...` : "";
      chartSeriesValues = (!isEmpty(menu)) ? [1] : [0];
    } catch (e) {
      shortMenu = "";
      chartSeriesValues = [0];
    }    
    const restaurant = {
      ...resource,
      ...{        
        chart_name: `Restaurant ${count}`,
        short_menu: shortMenu,        
        chart_series_values: {
          "data": chartSeriesValues,          
          "label": resource?.properties?.name
        }
      }
    };
    restaurants.push(restaurant);    
  }
  context.res.json({
    data: restaurants,
    total: restaurants.length
  });
};