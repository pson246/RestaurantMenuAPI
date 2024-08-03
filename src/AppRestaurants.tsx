import {
    BulkUpdateButton,
    Datagrid,
    Edit,    
    Identifier,    
    Labeled,
    List,
    RaRecord,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    TopToolbar
} from "react-admin";

export const RestaurantList = () => (
    <List actions={<TopToolbarButtons />}>   
        <Datagrid bulkActionButtons={<BulkActionButtons />} isRowSelectable={record => record.short_menu?.trim() !== ""} rowClick={(id: Identifier, resource: string, record: RaRecord) => record.short_menu?.trim() !== "" ? "show" : false}>
            <TextField label="Restaurant Name" source="properties.name" sortable={false} />
            <TextField label="Opening Hours" source="properties.opening_hours" sortable={false} />
            <TextField label="Menu" source="short_menu" sortable={false} />
        </Datagrid>
    </List>
);

const BulkActionButtons = () => (
    <>
        <BulkUpdateButton data={{}} label="Update Menu" mutationMode="optimistic" confirmTitle="Confirmation" confirmContent="Are you sure you want to update menu for selected restaurants?" />
    </>
);

const TopToolbarButtons = () => (
    <TopToolbar>        
    </TopToolbar>
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