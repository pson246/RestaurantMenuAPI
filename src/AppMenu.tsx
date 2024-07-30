import { Menu } from 'react-admin';
import BalanceIcon from '@mui/icons-material/Balance';

export const AppMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.ResourceItem name="restaurants" />        
        <Menu.Item to="/attribution" primaryText="© OpenStreetMap" leftIcon={<BalanceIcon />} />
    </Menu>
);