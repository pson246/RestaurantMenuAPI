import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { RestaurantEdit, RestaurantList } from "./Restaurants";
import { Route } from 'react-router-dom';
import { OpenStreetMapAttribution } from "./OpenStreetMapAttribution";
import { Chart } from "./chart/Chart";
import { Layout, LayoutProps } from 'react-admin';
import { JSX } from 'react/jsx-runtime';
import { Menu } from 'react-admin';
import BalanceIcon from '@mui/icons-material/Balance';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const App = () => (  
  <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}    
      layout={AdminLayout}>
    <Resource name="restaurants" list={RestaurantList} edit={RestaurantEdit} />
    <CustomRoutes>
        <Route path="/chart" element={<Chart />} />
    </CustomRoutes>
    <CustomRoutes>
        <Route path="/attribution" element={<OpenStreetMapAttribution />} />           
    </CustomRoutes>
  </Admin>
);

const AdminMenu = () => (
    <Menu>        
        <Menu.ResourceItem name="restaurants" />
        <Menu.Item to="/chart" primaryText="Menu Availability" leftIcon={<DashboardIcon />} />
        <Menu.Item to="/attribution" primaryText="© OpenStreetMap" leftIcon={<BalanceIcon />} />
    </Menu>
);

const AdminLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => <Layout {...props} menu={AdminMenu} />;