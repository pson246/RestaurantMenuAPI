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
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextInput label="Menu" source="menu" sx={{ marginTop: "5px" }} />
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
            <Labeled sx={{ marginBottom: "10px" }}>
                <TextField label="Menu" source="menu" sx={{ marginTop: "5px" }} />
            </Labeled>
        </SimpleShowLayout>
    </Show>
);