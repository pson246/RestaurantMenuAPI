/*
import jsonServerProvider from "ra-data-json-server";
export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL
);
 */
import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  fetchUtils,
  //GetOneParams,
  //GetOneResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  Identifier,
  RaRecord,  
  UpdateParams,
  UpdateResult
} from "react-admin";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || process.env.VITE_REACT_APP_API_URL || "";

export const dataProvider: DataProvider = {  
  getList: async (_resource, _params) => {
    const response = await fetchUtils?.fetchJson(`${API_URL}/api/EuropeFinlandHelsinkiRestaurantListHttp`);
    return {
      data: response?.json?.data,
      total: response?.json?.total
    };
  },
  getChartData: async () => {
    const restaurantsResponse = await fetchUtils?.fetchJson(`${API_URL}/api/EuropeFinlandHelsinkiRestaurantListHttp`);
    const lunchMenuAvailabilitySeries = [];
    const alacarteMenuAvailabilitySeries = [];
    var x1Value = 0;
    var x2Value = 0;    
    for (const resource of restaurantsResponse?.json?.data) {       
      x2Value += 1;
      x1Value = x2Value - 0.1;
      const name = resource?.properties?.name || "";
      const lunchMenu = resource?.lunchMenu || "";
      const alacarteMenu = resource?.alacarteMenu || "";
      var y1Value = 0;
      var y2Value = 0;
      try {              
        if (lunchMenu && lunchMenu?.trim() !== "") {
          y1Value = 1;          
        } else {
          y1Value = 0;          
        }
        if (alacarteMenu && alacarteMenu?.trim() !== "") {
          y2Value = 1;          
        } else {
          y2Value = 0;          
        }
      } catch (e) {                
        y1Value = 0;
        y2Value = 0;
      }          
      lunchMenuAvailabilitySeries.push({
        x: x1Value,
        y: y1Value,        
        id: name
      });
      alacarteMenuAvailabilitySeries.push({
        x: x2Value,
        y: y2Value,     
        id: name
      });
    }
    return [
      {
        "label": "Lunch menu availability",
        "data": lunchMenuAvailabilitySeries
      },
      {
        "label": "À la carte menu availability",
        "data": alacarteMenuAvailabilitySeries
      },
    ];
  },
  getOne: async (_resource, params) => {
    const restaurantId = String(params?.id);
    const response = await fetchUtils?.fetchJson(`${API_URL}/api/EuropeFinlandHelsinkiRestaurantGetOneHttp/${restaurantId}`);
    return {
      data: response?.json?.data
    };
  },
  updateMany: async (_resource, _params) => {
    const response = await fetchUtils?.fetchJson(`${API_URL}/api/EuropeFinlandHelsinkiRestaurantMenuUpdateHttp`);
    return {
      data: response?.json?.data
    };
  },
  getMany: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: GetManyParams): Promise<GetManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  getManyReference: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  update: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: UpdateParams<any>): Promise<UpdateResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  create: function <RecordType extends Omit<RaRecord<Identifier>, "id"> = any, ResultRecordType extends RaRecord<Identifier> = RecordType & { id: Identifier; }>(resource: string, params: CreateParams<any>): Promise<CreateResult<ResultRecordType>> {
    throw new Error("Function not implemented.");
  },
  delete: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  deleteMany: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  }
};