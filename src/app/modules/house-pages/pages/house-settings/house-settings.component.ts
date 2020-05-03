import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HouseDeleteConfirmDialogComponent } from '@hrh/houses/house-delete-confirm-dialog/house-delete-confirm-dialog.component';
import {
  HouseDeleteConfirmDialogInput,
  HouseDeleteConfirmDialogResult
} from '@hrh/houses/house-delete-confirm-dialog/house-delete-confirm-dialog-input.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseInfoResolver } from '@hrh/houses/_resolver/house-info.resolver';
import { first, map, shareReplay, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';

@Component({
  selector: 'hrh-house-settings',
  templateUrl: './house-settings.component.html',
  styleUrls: ['./house-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseSettingsComponent implements OnInit {
  private house$ = this.activatedRoute.parent?.data.pipe(map(HouseInfoResolver.extract), shareReplay(1)) ?? EMPTY;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly housesService: HousesService,
    private readonly notificationsService: NotificationsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  handleDeleteHouseClick() {
    this.house$
      .pipe(
        first(),
        switchMap((house) => {
          return this.dialog
            .open<HouseDeleteConfirmDialogComponent, HouseDeleteConfirmDialogInput>(HouseDeleteConfirmDialogComponent, {
              data: {
                id: house.id,
                name: house.name
              }
            })
            .afterClosed();
        }),
        switchMap((res?: HouseDeleteConfirmDialogResult) => {
          if (res?.confirmed === true) {
            return this.housesService.deleteHouse(res.id);
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.notificationsService.success('House deleted');
        this.router.navigate(['']);
      });
  }
}
