import { Injectable } from '@angular/core';
import { houseRoutes } from '@hrh/houses/_services/houses.service';
import { InvitationCreateInput } from '../_models/invitation.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
