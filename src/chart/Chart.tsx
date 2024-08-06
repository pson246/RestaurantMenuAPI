import { Stack } from "@mui/material";
import { useEffect, useState } from 'react';
import { dataProvider } from '../dataProvider';
import { ScatterChart } from "@mui/x-charts";

const DATASET_SCHEMA = [
    { x: 1, y: 1, id: "Restaurant Acme 1" },
    { x: 2, y: 0, id: "Restaurant Acme 2" },
    { x: 3, y: 1, id: "Restaurant Acme 3" }
];
const VORONOI_MAX_RADIUS = 99;
const HEIGHT = 601;
const X_AXIS_MIN = 0;
const LABEL = "Data of 10 restaurants in Helsinki, Finland";
const COLORS = ["#2196f3"];

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
                series={[{ "data": data, label: LABEL }]}
                xAxis={[{ min: X_AXIS_MIN }]}
                colors={ COLORS }
            />
        </Stack>
    );
};