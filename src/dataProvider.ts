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
    const chartData = [];
    for (const resource of restaurantsResponse?.json?.data) {                  
      const name = resource?.properties?.name;
      const menu = resource?.menu;
      var chartName = "";      
      var chartSeriesValue = 0;
      try {              
        if (menu && menu?.trim() !== "") {
          chartSeriesValue = 1;
          chartName = (name && name?.trim() !== "") ? name : "";
        } else {
          chartSeriesValue = 0;
          chartName = (name && name?.trim() !== "") ? `${name?.substring(0, 10)} ...` : "";
        }
      } catch (e) {        
        chartName = "";
        chartSeriesValue = 0;
      }    
      const chartSeriesData = {        
        chart_name: chartName,          
        chart_series_value: chartSeriesValue
      };
      chartData.push(chartSeriesData);
    }
    return chartData;
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