import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./dashboard/Dashboard";
import { RestaurantList } from "./restaurants";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    dashboard={Dashboard}>
    <Resource name="restaurants" list={RestaurantList} />
  </Admin>
);
