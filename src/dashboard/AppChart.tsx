import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { calculateSpidersCount, calculateSpiderAvailableAndMissingPercentage } from './AppChartUtils';
import { dataProvider } from '../dataProvider';

export const Chart = () => {
    const [spiderAvailablePercentage, setSpiderAvailablePercentage] = useState(1);
    const [spiderMissingPercentage, setSpiderMissingPercentage] = useState(99);
    useEffect(() => {                
        initializeChart();
    }, []);
    const initializeChart = async () => {
        const response = await dataProvider?.getList("restaurants", {
            pagination: {page: 0, perPage: 0},
            sort: {field: "", order: "ASC"},
            filter: undefined
        });
        const restaurants = response?.data;
        const restaurantsCount = restaurants?.length;
        var restaurantSpidersCount = calculateSpidersCount(restaurants);        
        const spiderAvailableAndMissingPercentage =
            calculateSpiderAvailableAndMissingPercentage(restaurantsCount, restaurantSpidersCount);        
        const availablePercentage = spiderAvailableAndMissingPercentage["availablePercentage"];
        const missingPercentage = spiderAvailableAndMissingPercentage["missingPercentage"];
        setSpiderAvailablePercentage(availablePercentage);
        setSpiderMissingPercentage(missingPercentage);
    };
    return <PieChart
        series={[
            {
                data: [
                    { id: 0, value: spiderAvailablePercentage, label: 'Restaurants Menu Available', color: 'green' },
                    { id: 1, value: spiderMissingPercentage, label: 'Restaurants Menu Unavailable ', color: 'pink' }
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