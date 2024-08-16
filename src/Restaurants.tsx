import {
    BulkUpdateButton,
    Datagrid,
    Edit,
    FunctionField,
    Labeled,
    List,
    RaRecord,
    SaveButton,
    SimpleForm,
    TextField,
    TextInput,
    Toolbar,
    TopToolbar,
    useRecordContext
} from "react-admin";
import { encode } from "html-entities";
import { isEmpty } from "react-admin";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const encodeHtmlMode = "nonAsciiPrintable";
const encodeHtmlLevel = "xml";
const htmlLineBreak = "<br/>";

const RestaurantPanel = () => {
    const record = useRecordContext();
    var lunchMenu = undefined;
    var alacarteMenu = undefined;
    var menuHtml = "";
    if (!isEmpty(record.lunchMenu)) {
        lunchMenu = record.lunchMenu;
    }
    lunchMenu = encode(lunchMenu, { mode: encodeHtmlMode, level: encodeHtmlLevel });
    if (!isEmpty(record.alacarteMenu)) {
        alacarteMenu = record.alacarteMenu;
    }
    alacarteMenu = encode(alacarteMenu, { mode: encodeHtmlMode, level: encodeHtmlLevel });
    if (lunchMenu || alacarteMenu) {
        menuHtml = `${htmlLineBreak}(Lunch Menu) ${lunchMenu}` +            
            `${htmlLineBreak}${htmlLineBreak}` +
            `${alacarteMenu}${htmlLineBreak}${htmlLineBreak}`;
    } else {
        menuHtml = htmlLineBreak;
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

    const getMenuAvailabilityHtmlIcon = (record: RaRecord) => {        
        if (!isEmpty(record?.lunchMenu) || !isEmpty(record?.alacarteMenu)) {
            return <CheckCircleIcon />
        } else {
            return "";
        }
    };

    const getRowSelectable = (record: RaRecord) => {
        return (!isEmpty(record?.lunchMenu) || !isEmpty(record?.alacarteMenu));
    };

    return (
        <List actions={<TopToolbarButtons />}>
            <Datagrid bulkActionButtons={<BulkActionButtons />} expand={<RestaurantPanel />} rowClick={"edit"} isRowSelectable={record => getRowSelectable(record)}>
                <TextField label="Restaurant Name" source="properties.name" sortable={false} />
                <FunctionField label="Menu Availability" render={(record: RaRecord) => getMenuAvailabilityHtmlIcon(record)} />
                <TextField label="Opening Hours" source="properties.opening_hours" sortable={false} />
                <TextField label="Website" source="properties.contact:website" sortable={false} />                
            </Datagrid>
        </List>
    );
};

const EditToolbar = () => (
    <Toolbar>
        <SaveButton />
    </Toolbar>
);

export const RestaurantEdit = () => {
    return (
        <Edit title="Restaurant Edit">
            <SimpleForm toolbar={<EditToolbar />}>
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
                <TextInput label="Website" source="properties.contact:website" sx={{ marginTop: "5px" }} />                
            </SimpleForm>
        </Edit>
    );
};