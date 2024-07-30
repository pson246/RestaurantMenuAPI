import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { Dashboard } from "./dashboard/Dashboard";
import { RestaurantList, RestaurantShow } from "./restaurants";

export const App = () => (  
  <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}      
      dashboard={Dashboard}>
    <Resource name="restaurants" list={RestaurantList} show={RestaurantShow} />
  </Admin>
);