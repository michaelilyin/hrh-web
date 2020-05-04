import { ID, UUID } from '@hrh/sdk/api/id.model';

export interface CurrentHouse {
  id: ID;
  name: string;
  description?: string;
}

export interface House {
  id: ID;
  name: string;
  description?: string;
  ownerBy: UUID;
}

export interface HouseCreate {
  name: string;
  description?: string;
}
