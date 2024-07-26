const { getContainer } = require("../containerProvider.js");

module.exports = async function (context, req) {

    const container = await getContainer();

    const restaurantId = req.params.id;
    
    const restaurantQuery = {
        query: `SELECT * FROM ${container.id} f WHERE f.id = @id`,
        parameters: [{
            name: "@id",
            value: restaurantId,
        }],
    };

    const { resources } = await container.items.query(restaurantQuery).fetchAll();

    const restaurant = resources[0];

    context.res.json({
        data: restaurant
    });

}