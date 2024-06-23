import { Datagrid, List, TextField } from "react-admin";

export const RestaurantList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
        </Datagrid>
    </List>
);