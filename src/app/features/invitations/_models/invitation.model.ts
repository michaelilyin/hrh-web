export interface InvitationView {
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
