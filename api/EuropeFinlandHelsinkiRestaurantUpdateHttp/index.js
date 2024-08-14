const { getContainer } = require("../containerProvider.js");
const { isEmpty } = require("../stringUtils.js");

module.exports = async function (context, req) {    
    var updatedRestaurant = {};
    try {
        const container = await getContainer();
        const restaurantId = req.params?.id;        
        const website = req.body?.website;
        const restaurantQuery = {
            query: `SELECT * FROM ${container.id} f WHERE f.id = @id`,
            parameters: [{
                name: "@id",
                value: restaurantId,
            }]
        };
        const { resources } = await container?.items?.query(restaurantQuery)?.fetchAll();
        const restaurant = resources[0];
        const id = restaurant?.id;
        const partitionKey = restaurant?.partitionkeyvalue?.restaurantid;
        const operations = [                
            { op: "add", path: "/properties/contact:website", value: website }
        ];        
        const { resource: updated } = await container?.item(id, partitionKey)?.patch(operations);
        if (!isEmpty(updated?.id)) {
            updatedRestaurant = updated;
        } else {
            updatedRestaurant = {};
        }
    } catch (error) {
        console.log(`Error updating restaurant id: ${req.params?.id}`, error);
        updatedRestaurant = {};
    }
    context.res.json({
        data: updatedRestaurant
    });
};