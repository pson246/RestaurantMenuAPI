import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { Dashboard } from "./dashboard/Dashboard";
import { RestaurantList, RestaurantShow } from "./AppRestaurants";
import { Route } from 'react-router-dom';
import { OpenStreetMapAttribution } from "./OpenStreetMapAttribution";
import { AppLayout } from "./AppLayout";

export const App = () => (  
  <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}      
      dashboard={Dashboard}
      layout={AppLayout}>
    <Resource name="restaurants" list={RestaurantList} show={RestaurantShow} />
    <CustomRoutes>
        <Route path="/attribution" element={<OpenStreetMapAttribution/>} />           
    </CustomRoutes>
  </Admin>
);