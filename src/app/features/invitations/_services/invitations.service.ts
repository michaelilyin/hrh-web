import { Injectable } from '@angular/core';
import { houseRoutes } from '@hrh/houses/_services/houses.service';
import { HouseInvitationsFilter, InvitationCreateInput, InvitationView } from '../_models/invitation.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '@hrh/sdk/api/page.model';
import { HttpStreamService } from '@hrh/sdk/angular/http/http-stream.service';
import { FilterRequest, PageRequest, SortRequest } from '@hrh/sdk/data/model/data-request.model';
import { writeUrlInt } from '@hrh/sdk/api/ values/int';
import { writeUrlString } from '@hrh/sdk/api/ values/string';
import { writeUrlBool } from '@hrh/sdk/api/ values/bool';

const invitationRoutes = {
  houseInvitations: (houseId: string) => `${houseRoutes.houseById(houseId)}/invitations`
};

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {
  constructor(private readonly http: HttpClient, private readonly stream: HttpStreamService) {}

  createInvitation(input: InvitationCreateInput): Observable<void> {
    return this.http.post<void>(invitationRoutes.houseInvitations(input.houseId), input);
  }

  streamHouseInvitations(
    houseId: string,
    filter: FilterRequest<HouseInvitationsFilter>,
    page: PageRequest,
    sort: SortRequest
  ): Observable<readonly InvitationView[]> {
    return this.stream.get<InvitationView>(invitationRoutes.houseInvitations(houseId), true, {
      email: writeUrlString(filter.fields.email?.value),
      sort: writeUrlString(sort.fields[0]?.name),
      desc: writeUrlBool(sort.fields[0] != undefined ? sort.fields[0].direction === 'desc' : undefined),
      offset: writeUrlInt(page.offset),
      limit: writeUrlInt(page.limit)
    });
  }
}
