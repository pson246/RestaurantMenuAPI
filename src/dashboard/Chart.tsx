import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { CosmosClient } from '@azure/cosmos';
import { dbConfig } from '../dbConfig';

export const Chart = () => {

    const [spiderAvailablePercentage, setSpiderAvailablePercentage] = useState(0);
    const [spiderMissingPercentage, setSpiderMissingPercentage] = useState(0);

    useEffect(() => {        
        dbConnect();
    }, []);

    const dbConnect = async () => {

        const endpoint = dbConfig.host;
        const key = dbConfig.authKey;        
        
        const cosmosClient = new CosmosClient({ endpoint, key });
        const databaseId = dbConfig.databaseId;
        const containerId = dbConfig.containerId;

        const dbResponse = await cosmosClient.databases.createIfNotExists({
            id: databaseId
        });
        const database = dbResponse.database;

        const coResponse = await database.containers.createIfNotExists({
            id: containerId
        });

        const container = coResponse.container;

        const restaurantsCountQuery = "SELECT VALUE COUNT(1) from c";        

        const restaurantsCount = (await container.items.query(restaurantsCountQuery).fetchAll()).resources[0];        

        const restaurantSpidersCountQuery = "SELECT VALUE COUNT(c.foodItems) from c";

        const restaurantSpidersCount = (await container.items.query(restaurantSpidersCountQuery).fetchAll()).resources[0];        
        
        calculateSpiderAvailableAndMissingPercentage(restaurantsCount, restaurantSpidersCount);

    };

    function calculateSpiderAvailableAndMissingPercentage(restaurantsCount: number, restaurantSpidersCount: number) {

        const availablePercentage = Math.round((restaurantSpidersCount / restaurantsCount) * 100);
        
        const missingPercentage = 100 - availablePercentage;

        setSpiderAvailablePercentage(availablePercentage);

        setSpiderMissingPercentage(missingPercentage);

    };

    return <PieChart
        series={[
            {
                data: [
                    { id: 0, value: spiderAvailablePercentage, label: 'series A', color: 'green' },
                    { id: 1, value: spiderMissingPercentage, label: 'series B', color: 'red' }
                ],
                innerRadius: 30,
                outerRadius: 99,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 360,
                cx: 160,
                cy: 160
            }
        ]}
        width={600}
        height={300}
    />
};