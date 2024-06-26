import { Datagrid, Edit, List, SimpleForm, TextField, TextInput } from "react-admin";

export const RestaurantList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="properties.name" />
            <TextField source="properties.opening_hours" />
        </Datagrid>
    </List>
);

export const RestaurantEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="properties.opening_hours" />
        </SimpleForm>
    </Edit>
);