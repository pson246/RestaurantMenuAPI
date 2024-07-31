const { getContainer } = require("../containerProvider.js");

module.exports = async function (context, req) {
  const container = await getContainer();
  const restaurantsQuery = "SELECT * from c";
  const { resources } = await container.items.query(restaurantsQuery).fetchAll();
  context.res.json({
    data: resources,
    total: resources.length
  });
};