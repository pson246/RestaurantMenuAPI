import {
    Datagrid,
    Edit,
    Labeled,
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
            {/* <EditButton /> */}
        </Datagrid>
    </List>
);

export const RestaurantEdit = () => {
    return (
        <Edit title="Restaurant edit">
            <SimpleForm>
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextField label="Name" source="properties.name" sx={{ marginTop: "5px" }} />
                </Labeled>
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextField label="Opening hours" source="properties.opening_hours" sx={{ marginTop: "5px" }} />
                </Labeled>
                <Labeled>
                    <TextInput label="Food items" source="properties.foodItems" />
                </Labeled>                
            </SimpleForm>
        </Edit>
    )
};

export const RestaurantShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="properties.foodItems" />
        </SimpleShowLayout>
    </Show>
);