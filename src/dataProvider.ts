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
import { Container, CosmosClient } from '@azure/cosmos';
import { dbConfig } from "./dbConfig";

export const dataProvider: DataProvider = {

  async getContainer(): Promise<Container> {
    
    const endpoint = dbConfig.host;
    const key = dbConfig.authKey;

    const cosmosClient = new CosmosClient({ endpoint, key });
    const databaseId = dbConfig.databaseId;
    const containerId = dbConfig.containerId;

    const dbResponse = await cosmosClient.databases.createIfNotExists({
      id: databaseId
    });
    const database = dbResponse.database;

    const coResponse = await database.containers.createIfNotExists({
      id: containerId
    });

    const container = coResponse.container;

    return container;

  },
  getList: async (_resource, _params) => {

    const container = await dataProvider.getContainer();

    const restaurantsQuery = "SELECT * from c";
    const { resources } = await container.items.query(restaurantsQuery).fetchAll();

    return {
      data: resources,
      total: resources.length
    };

  },
  getOne: async (_resource, params) => {

    const container = await dataProvider.getContainer();
    
    const restaurantId = String(params.id);

    const restaurantQuery = {
      query: `SELECT * FROM ${container.id} f WHERE f.id = @id`,
      parameters: [{
        name: "@id",
        value: restaurantId,
      }],
    };

    const { resources } = await container.items.query(restaurantQuery).fetchAll();

    const restaurant = resources[0];

    return {
      data: restaurant
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