import { Grid } from "@mui/material";
import { Chart } from "./Chart";

export const Dashboard = () => {
    
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={9}>
                <Chart />
            </Grid>
        </Grid>
    );

};