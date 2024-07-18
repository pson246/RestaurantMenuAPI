import {
    Datagrid,
    Edit,
    List,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput
} from "react-admin";

export const RestaurantList = () => (
    <List>        
        <Datagrid rowClick="show">
            <TextField label="Name" source="properties.name" />
            <TextField label="Opening hours" source="properties.opening_hours" />
        </Datagrid>
    </List>
);

export const RestaurantEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="properties.opening_hours" />
            <TextInput source="properties.foodItems" />
        </SimpleForm>
    </Edit>
);

export const RestaurantShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="properties.foodItems" />     
        </SimpleShowLayout>
    </Show>
);