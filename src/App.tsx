import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { Dashboard } from "./dashboard/Dashboard";
import { RestaurantEdit, RestaurantList, RestaurantShow } from "./restaurants";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}>
    <Resource name="restaurants" list={RestaurantList} edit={RestaurantEdit} show={RestaurantShow} />
  </Admin>
);