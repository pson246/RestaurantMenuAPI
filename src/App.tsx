import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { Dashboard } from "./dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";
import { LoginPage } from "ra-auth-msal";

export const App = () => (
  <BrowserRouter>
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      dashboard={Dashboard}>
      {/* <Resource name="restaurants" list={RestaurantList} edit={RestaurantEdit} show={RestaurantShow} /> */}
      <Resource name="restaurants" />
    </Admin>
  </BrowserRouter>
);