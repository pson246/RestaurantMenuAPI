import { Stack } from "@mui/material";
import { useEffect, useState } from 'react';
import { dataProvider } from '../dataProvider';
import { ScatterChart } from "@mui/x-charts";

const DATASET_SCHEMA = [
    {
        "label": "Lunch menu availability",
        "data": [{ x: 1.0, y: 1.0, id: "Restaurant Acme 1"}]
    }, 
    {
        "label": "À la carte menu availability",
        "data": [{ x: 1.5, y: 1.0, id: "Restaurant Acme 1"}]
    }
];
const VORONOI_MAX_RADIUS = 99;
const HEIGHT = 601;
const X_AXIS_MIN = 0;
const COLORS = ["#2196f3", "#f1b6da"];

export const Chart = () => {
    const [data, setData] = useState(DATASET_SCHEMA);
    useEffect(() => {                
        initializeChart();
    }, []);
    const initializeChart = async () => {
        const restaurantsResponse = await dataProvider.getChartData();
        const chartData = restaurantsResponse;     
        setData(chartData);   
    };    
    return (
        <Stack direction="column" sx={{ width: "100%" }}>
            <ScatterChart height={ HEIGHT }                
                disableVoronoi={ false }
                grid={{ horizontal: true, vertical: true }}
                voronoiMaxRadius={ VORONOI_MAX_RADIUS }
                series={ data }
                xAxis={[{ min: X_AXIS_MIN }]}
                colors={ COLORS }
            />
        </Stack>
    );
};