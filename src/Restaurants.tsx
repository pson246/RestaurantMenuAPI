import {
    BulkUpdateButton,
    Datagrid,    
    Labeled,
    List,    
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    useRecordContext
} from "react-admin";

const RestaurantPanel = () => {
    const record = useRecordContext();
    var lunchMenu = undefined;
    var alacarteMenu = undefined;
    var menuHtml = "";
    if (record.lunchMenu && record.lunchMenu?.trim() !== "") {
        lunchMenu = record.lunchMenu;
    }
    if (record.alacarteMenu && record.alacarteMenu?.trim() !== "") {
        alacarteMenu = record.alacarteMenu;
    }
    if (lunchMenu || alacarteMenu) {
        menuHtml = "Lunch menu<br/><br/>" + lunchMenu + "<br/><br/>À la carte menu<br/><br/>" + alacarteMenu;
    } else {
        menuHtml = "<br/>";
    }
    return (
        <div dangerouslySetInnerHTML={{ __html: menuHtml }} />
    );
};

export const RestaurantList = () => (
    <List actions={<TopToolbarButtons />}>   
        <Datagrid bulkActionButtons={<BulkActionButtons />} expand={<RestaurantPanel />} isRowSelectable={record => (record.lunchMenu || record.alacarteMenu)? true : false} rowClick={false}>
            <TextField label="Restaurant Name" source="properties.name" sortable={false} />
            <TextField label="Opening Hours" source="properties.opening_hours" sortable={false} />            
            <TextField label="Website" source="properties.contact:website" sortable={false} />
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