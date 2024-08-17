[![Azure Static Web Apps CI/CD](https://github.com/pson246/RestaurantMenuAPI/actions/workflows/azure-static-web-apps-victorious-glacier-0540dc403.yml/badge.svg?branch=master)](https://github.com/pson246/RestaurantMenuAPI/actions/workflows/azure-static-web-apps-victorious-glacier-0540dc403.yml)

# RestaurantMenuAPI

## License

The project is dual-licensed under Apache 2.0 and MIT.
You can choose between one of them if you use this project.

## Installation

Install the application dependencies by running:

```sh
npm install
```

## Local configuration files

These local configuration files need to be added to the project before starting the application in development mode. Values of these properties are provided per demand, please let me know when you need them.

.env.development.local, at the root of the React application directory with following content:

```sh
VITE_REACT_APP_API_URL=""
```

local.settings.json, at the root of the API application directory (api) with following content:

```json
{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "",
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "VITE_REACT_APP_DB_HOST": "",
        "VITE_REACT_APP_DB_AUTH_KEY": "",
        "VITE_REACT_APP_DB_ID": "",
        "VITE_REACT_APP_DB_CONTAINER_ID": "",
        "VITE_REACT_APP_DB_AUTHENTICATION_USERNAME": "",
        "VITE_REACT_APP_DB_AUTHENTICATION_PASSWORD": ""
    }
}
```

## Development

Start the application in development mode by running first the API server then the React app. Please start these commands in different terminals:

```sh
swa start src --api-location api
npm run dev
```

## Production

Deploy the application to preview environment by creating pull requests from develop branch to master. Deploy to production environment after merging these develop pull requests or by direct pushing to master.

## DataProvider

The data provider uses [Azure Cosmos DB](https://azure.microsoft.com/en-us/products/cosmos-db/).
