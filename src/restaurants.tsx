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
        <Datagrid rowClick="show" isRowSelectable={selectable => false}>
            <TextField label="Restaurant Name" source="properties.name" />
            <TextField label="Opening Hours" source="properties.opening_hours" />
            {/* <EditButton /> */}
        </Datagrid>
    </List>
);

export const RestaurantEdit = () => {
    return (
        <Edit title="Restaurant edit">
            <SimpleForm>
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextField label="Restaurant Name" source="properties.name" sx={{ marginTop: "5px" }} />
                </Labeled>
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextField label="Opening Hours" source="properties.opening_hours" sx={{ marginTop: "5px" }} />
                </Labeled>
                <Labeled>
                    <TextInput label="Menu" source="properties.foodItems" />
                </Labeled>                
            </SimpleForm>
        </Edit>
    )
};

export const RestaurantShow = () => (
    <Show title="Restaurant Show">
        <SimpleShowLayout>
            <Labeled sx={{ marginBottom: "10px" }}>
                <TextField label="Restaurant Name" source="properties.name" sx={{ marginTop: "5px" }} />
            </Labeled>
            <Labeled sx={{ marginBottom: "10px" }}>
                <TextField label="Opening Hours" source="properties.opening_hours" sx={{ marginTop: "5px" }} />
            </Labeled>
            <Labeled>
                <TextField label="Menu" source="properties.foodItems" />
            </Labeled>
        </SimpleShowLayout>
    </Show>
);