import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Chart } from "./AppChart";

export const Dashboard = () => {    
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={9}>
                <Chart />
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