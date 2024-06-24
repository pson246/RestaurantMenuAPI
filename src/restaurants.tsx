import { Datagrid, List, TextField } from "react-admin";

export const RestaurantList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="properties.name" />
            <TextField source="properties.opening_hours" />
        </Datagrid>
    </List>
);