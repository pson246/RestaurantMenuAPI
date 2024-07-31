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
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  //GetOneParams,
  //GetOneResult,
  Identifier,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
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
  getOne: async (_resource, params) => {
    const restaurantId = String(params?.id);
    const response = await fetchUtils?.fetchJson(`${API_URL}/api/EuropeFinlandHelsinkiRestaurantGetOneHttp/${restaurantId}`);
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
  updateMany: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: UpdateManyParams<any>): Promise<UpdateManyResult<RecordType>> {
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