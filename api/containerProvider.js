const { CosmosClient } = require('@azure/cosmos');

async function getContainer() {
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

module.exports = {
    getContainer: getContainer
}