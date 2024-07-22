export let dbConfig = {
    "host": import.meta.env.VITE_REACT_APP_DB_HOST || process.env.REACT_APP_DB_HOST || "",
    "authKey": import.meta.env.VITE_REACT_APP_DB_AUTH_KEY || process.env.REACT_APP_DB_AUTH_KEY || "",
    "databaseId": "Restaurant",
    "containerId": "EuropeFinlandHelsinkiRestaurants"
};