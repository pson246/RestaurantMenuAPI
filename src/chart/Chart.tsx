import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { dataProvider } from '../dataProvider';
import { BarChart } from "@mui/x-charts";
/* const encodeHtml = (str: String) => {
    return str.replace(/[\u00A0-\u9999<>\&]/g, i => '&#' + i.charCodeAt(0) + ';');
};
 */
const RESTAURANT_SCHEMA = {
    "chart_series_values": {
        data: [0]
    }, "chart_name": "Restaurant A",
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
                        data: restaurants.map((restaurant) => restaurant?.chart_name)                        
                    }]}
                    series={restaurants.map((restaurant) => restaurant?.chart_series_values)}
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