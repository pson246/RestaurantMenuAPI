const { CosmosClient } = require('@azure/cosmos');

const getContainer = async () => {

    const host = process.env.VITE_REACT_APP_DB_HOST || "";        
    const authKey = process.env.VITE_REACT_APP_DB_AUTH_KEY || "";

    const cosmosClient = new CosmosClient({ endpoint: host, key: authKey });

    const databaseId = process.env.VITE_REACT_APP_DB_ID || "";
    const containerId = process.env.VITE_REACT_APP_DB_CONTAINER_ID || "";

    const dbResponse = await cosmosClient.databases.createIfNotExists({
      id: databaseId
    });
    const database = dbResponse.database;

    const coResponse = await database.containers.createIfNotExists({
      id: containerId
    });

    const container = coResponse.container;

    return container;

};

module.exports = async function (context, req) {        

    const container = await getContainer();

    const restaurantsQuery = "SELECT * from c";

    const { resources } = await container.items.query(restaurantsQuery).fetchAll();    

    context.res.json({
        data: resources,
        total: resources.length
    });    

}