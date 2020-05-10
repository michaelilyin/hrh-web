import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvitePersonDialog } from '@hrh/invitations/invite-person/invite-person.dialog';
import { HouseContextService } from '../../_context/house.context';
import { InvitePersonDialogInput } from '@hrh/invitations/invite-person/invite-person-dialog-input.model';
import { first, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  templateUrl: './house-settings-invitations.page.html',
  styleUrls: ['./house-settings-invitations.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseSettingsInvitationsPage implements OnInit {
  constructor(private readonly dialog: MatDialog, private readonly houseContextService: HouseContextService) {}

  ngOnInit(): void {}

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
