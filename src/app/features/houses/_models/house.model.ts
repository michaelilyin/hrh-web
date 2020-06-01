import { ID, UUID } from '@hrh/sdk/api/id.model';
import { HasPageInfo } from '@hrh/sdk/api/page.model';

export interface CurrentHouse extends HasPageInfo {
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

export interface HouseBasicUpdate {
  id: ID;
  name: string;
  description?: string;
}
