import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { calculateSpidersCount, calculateSpiderAvailableAndMissingPercentage } from './ChartUtils';

export const Chart = () => {

    const [spiderAvailablePercentage, setSpiderAvailablePercentage] = useState(1);
    const [spiderMissingPercentage, setSpiderMissingPercentage] = useState(99);

    useEffect(() => {        
        // dbConnect();
    }, []);

    /* const dbConnect = async () => {

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
        const restaurantSpidersCountQuery = "SELECT VALUE COUNT(c.foodItems) from c";

        
        const restaurantsQuery = "SELECT * from c";
        const { resources } = await container.items.query(restaurantsQuery).fetchAll();        

        const restaurantsCount = resources.length;
        var restaurantSpidersCount = calculateSpidersCount(resources);
        
        const spiderAvailableAndMissingPercentage =
            calculateSpiderAvailableAndMissingPercentage(restaurantsCount, restaurantSpidersCount);
        
        const availablePercentage = spiderAvailableAndMissingPercentage["availablePercentage"];
        const missingPercentage = spiderAvailableAndMissingPercentage["missingPercentage"];

        setSpiderAvailablePercentage(availablePercentage);
        setSpiderMissingPercentage(missingPercentage);        

    };   */      

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