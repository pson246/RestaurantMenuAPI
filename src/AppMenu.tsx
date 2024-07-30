import { Menu } from 'react-admin';
import AttributionIcon from '@mui/icons-material/Attribution';

export const AppMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.ResourceItem name="restaurants" />        
        <Menu.Item to="/attribution" primaryText="© OpenStreetMap" leftIcon={<AttributionIcon />} />
    </Menu>
);