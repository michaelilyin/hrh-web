import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvitePersonDialog } from '@hrh/invitations/invite-person/invite-person.dialog';
import { HouseContextService } from '../../_context/house.context';
import { InvitePersonDialogInput } from '@hrh/invitations/invite-person/invite-person-dialog-input.model';
import { first, map, shareReplay, switchMap } from 'rxjs/operators';
import { EMPTY, of, pipe } from 'rxjs';
import { InvitationsService } from '@hrh/invitations/_services/invitations.service';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';
import { pageOf, pageToResponse } from '@hrh/sdk/api/page.model';
import { FetchFn } from '@hrh/sdk/data/model/data-request.model';
import { InvitationView } from '@hrh/invitations/_models/invitation.model';

@Component({
  templateUrl: './house-settings-invitations.page.html',
  styleUrls: ['./house-settings-invitations.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseSettingsInvitationsPage implements OnInit {
  readonly columns = ['email', 'invitation'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly houseContextService: HouseContextService,
    private readonly invitationsService: InvitationsService,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}

  fetchInvitations: FetchFn<InvitationView> = (request) => {
    return this.houseContextService.context$.pipe(
      first(),
      switchMap((house) => {
        if (house == undefined) {
          return of(pageOf<InvitationView>());
        }
        return this.invitationsService.getHouseInvitations(house.id);
      }),
      map(pageToResponse),
      this.notificationsService.catchError(() => of(pageOf<InvitationView>()))
    );
  };

  handleInvitePersonClick() {
    this.houseContextService.context$
      .pipe(
        first(),
        switchMap((house) => {
          if (house == undefined) {
            return EMPTY;
          }
          return this.dialog
            .open<InvitePersonDialog, InvitePersonDialogInput>(InvitePersonDialog, {
              data: {
                house
              }
            })
            .afterClosed();
        })
      )
      .subscribe((res) => {});
  }
}
