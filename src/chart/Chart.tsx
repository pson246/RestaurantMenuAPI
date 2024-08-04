import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { dataProvider } from '../dataProvider';
import { BarChart } from "@mui/x-charts";
/* const encodeHtml = (str: String) => {
    return str.replace(/[\u00A0-\u9999<>\&]/g, i => '&#' + i.charCodeAt(0) + ';');
};
 */
const RESTAURANT_SCHEMA = {
    "chart_series_value": 1,
    "short_name": "Ravintola ...",
    "properties": {
        "name": ""
    }
};

export const Chart = () => {
    const [restaurants, setRestaurants] = useState([RESTAURANT_SCHEMA]);
    useEffect(() => {                
        initializeChart();
    }, []);
    const initializeChart = async () => {
        const restaurantsResponse = await dataProvider?.getList("restaurants", {
            pagination: {page: 0, perPage: 0},
            sort: {field: "", order: "DESC"},
            filter: undefined
        });
        const data = restaurantsResponse?.data;
        setRestaurants(data);        
    };    
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={12}>
                <BarChart
                    xAxis={[{
                        scaleType: 'band',
                        data: restaurants.map((restaurant) => restaurant?.short_name)                        
                    }]}
                    yAxis={[
                        {
                            label: 'Availability (0/1)',
                        },
                    ]}
                    series={[
                        { data: restaurants.map((restaurant) => restaurant?.chart_series_value) }]}
                    height={300}                    
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14, paddingTop: '5px', fontWeight: 'normal'}} color="text.secondary">
                            Chart data currently based on 10 restaurants in Helsinki, Finland
                        </Typography>        
                    </CardContent>      
                </Card>
            </Grid>
        </Grid>
    );
};