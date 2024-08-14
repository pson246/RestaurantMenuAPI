import {
    BulkUpdateButton,
    Datagrid,    
    Edit,
    Labeled,
    List,    
    RaRecord,        
    SimpleForm,
    TextField,
    TextInput,
    TopToolbar,
    useRecordContext
} from "react-admin";
import { encode } from "html-entities";

const ENCODE_HTML_MODE = "nonAsciiPrintable";
const ENCODE_HTML_LEVEL = "xml";

const RestaurantPanel = () => {
    const record = useRecordContext();
    var lunchMenu = undefined;
    var alacarteMenu = undefined;
    var menuHtml = "";
    if (record.lunchMenu && record.lunchMenu?.trim() !== "") {
        lunchMenu = record.lunchMenu;
    }
    lunchMenu = encode(lunchMenu, { mode: ENCODE_HTML_MODE, level: ENCODE_HTML_LEVEL });
    if (record.alacarteMenu && record.alacarteMenu?.trim() !== "") {
        alacarteMenu = record.alacarteMenu;
    }
    alacarteMenu = encode(alacarteMenu, { mode: ENCODE_HTML_MODE, level: ENCODE_HTML_LEVEL });
    if (lunchMenu || alacarteMenu) {
        menuHtml = "Lunch menu<br/><br/>" + lunchMenu + "<br/><br/>À la carte menu<br/><br/>" + alacarteMenu;
    } else {
        menuHtml = "<br/>";
    }
    return (
        <div dangerouslySetInnerHTML={{__html: menuHtml}} />
    );
};

const BulkActionButtons = () => (
    <>
        <BulkUpdateButton data={{}} label="Update Menu" mutationMode="optimistic" confirmTitle="Confirmation" confirmContent="Are you sure you want to update menu for selected restaurants?" />
    </>
);

const TopToolbarButtons = () => (
    <TopToolbar>        
    </TopToolbar>
);

export const RestaurantList = () => {

    const isRowSelectable = (restaurantRecord: RaRecord) => {
        const result = (restaurantRecord.lunchMenu || restaurantRecord.alacarteMenu) ? true : false;
        return result;
    };

    return (
        <List actions={<TopToolbarButtons />}>
            <Datagrid bulkActionButtons={<BulkActionButtons />} expand={<RestaurantPanel />} isRowSelectable={record => isRowSelectable(record)} rowClick={"edit"}>
                <TextField label="Restaurant Name" source="properties.name" sortable={false} />
                <TextField label="Opening Hours" source="properties.opening_hours" sortable={false} />
                <TextField label="Website" source="properties.contact:website" sortable={false} />
            </Datagrid>
        </List>
    );
};

export const RestaurantEdit = () => {
    return (
        <Edit title="Restaurant Edit">
            <SimpleForm>
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextField label="Restaurant Name" source="properties.name" sx={{ marginTop: "5px" }} />
                </Labeled>
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextField label="Lunch Menu" source="lunchMenu" sx={{ marginTop: "5px" }} />
                </Labeled>
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextField label="À la carte Menu" source="alacarteMenu" sx={{ marginTop: "5px" }} />
                </Labeled>
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextField label="Opening Hours" source="properties.opening_hours" sx={{ marginTop: "5px" }} />
                </Labeled>
                <Labeled sx={{ marginBottom: "10px" }}>
                    <TextInput label="Website" source="properties.contact:website" sx={{ marginTop: "5px" }} />
                </Labeled>
            </SimpleForm>
        </Edit>
    );
};