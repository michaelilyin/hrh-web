import { HasPageInfo } from '@hrh/sdk/api/page.model';
import { FilterField, FilterFields } from '@hrh/sdk/data/commons/filter.model';

export interface HouseInvitationsFilter extends FilterFields {
  email: FilterField<string>;
}

export interface InvitationView extends HasPageInfo {
  id: string;
  houseId: string;
  userEmail: string;
  invitation: string;
}

export interface InvitationCreateInput {
  houseId: string;
  userEmail: string;
  invitation: string;
}
