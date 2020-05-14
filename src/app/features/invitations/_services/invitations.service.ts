import { Injectable } from '@angular/core';
import { houseRoutes } from '@hrh/houses/_services/houses.service';
import { InvitationCreateInput, InvitationView } from '../_models/invitation.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '@hrh/sdk/api/page.model';

const invitationRoutes = {
  houseInvitations: (houseId: string) => `${houseRoutes.houseById(houseId)}/invitations`
};

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {
  constructor(private readonly http: HttpClient) {}

  createInvitation(input: InvitationCreateInput): Observable<void> {
    return this.http.post<void>(invitationRoutes.houseInvitations(input.houseId), input);
  }

  getHouseInvitations(houseId: string): Observable<Page<InvitationView>> {
    return this.http.get<Page<InvitationView>>(invitationRoutes.houseInvitations(houseId));
  }
}
