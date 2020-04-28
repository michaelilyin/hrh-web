import { ID } from '@hrh/sdk/api/id.model';

export interface CurrentHouse {
  id: ID;
  name: string;
}

export interface House {
  id: ID;
  name: string;
}

export interface HouseCreate {
  name: string;
}
