import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            © OpenStreetMap, data is available under the <a href="https://www.openstreetmap.org/copyright">Open Database License</a>
        </Typography>        
      </CardContent>      
    </Card>
  );
};

export const OpenStreetMapAttribution = () => {
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={9}>
                <BasicCard />
            </Grid>
        </Grid>
    );
};