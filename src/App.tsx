import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./dashboard/Dashboard";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    dashboard={Dashboard}>
    <Resource name="users" list={ListGuesser} />
  </Admin>
);
