import { Grid } from "@mui/material";
import { useEffect, useState } from 'react';
import { dataProvider } from '../dataProvider';
import { BarChart } from "@mui/x-charts";

const RESTAURANT_SCHEMA = {    
    "chart_name": "Restaurant Acme ...",
    "chart_series_value": 0
};

export const Chart = () => {
    const [chartData, setChartData] = useState([RESTAURANT_SCHEMA]);
    useEffect(() => {                
        initializeChart();
    }, []);
    const initializeChart = async () => {
        const restaurantsResponse = await dataProvider.getChartData();
        const data = restaurantsResponse;        
        setChartData(data);        
    };    
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={12}>
                <BarChart
                    xAxis={[{
                        scaleType: 'band',
                        data: chartData.map((restaurant) => restaurant?.chart_name),
                        label: "Chart data currently based on 10 restaurants in Helsinki, Finland"
                    }]}
                    series={[{ data: chartData.map((restaurant) => restaurant?.chart_series_value)}]}
                    height={300}                    
                />
            </Grid>            
        </Grid>
    );
};