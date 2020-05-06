import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { first, map, shareReplay, switchMap } from 'rxjs/operators';
import { HouseInfoResolver } from '@hrh/houses/_resolver/house-info.resolver';
import { EMPTY, Subscription } from 'rxjs';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';
import { HouseDeleteConfirmDialogComponent } from '@hrh/houses/house-delete-confirm-dialog/house-delete-confirm-dialog.component';
import {
  HouseDeleteConfirmDialogInput,
  HouseDeleteConfirmDialogResult
} from '@hrh/houses/house-delete-confirm-dialog/house-delete-confirm-dialog-input.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseValidation } from '@hrh/houses/_validation/house.validation';

interface NamingUpdateForm {
  name: string;
  description: string;
}

@Component({
  templateUrl: './house-settings-administrative.page.html',
  styleUrls: ['./house-settings-administrative.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseSettingsAdministrativePage implements OnInit, OnDestroy {
  // TODO: think about parent data observe
  private house$ =
    this.activatedRoute.parent?.parent?.data.pipe(map(HouseInfoResolver.extract), shareReplay(1)) ?? EMPTY;

  deleted = false;
  namingForm!: FormGroup;
  readonly HouseValidation = HouseValidation;

  @ViewChild('danger', { read: Loader, static: true }) dangerLoader!: Loader;
  @ViewChild('naming', { read: Loader, static: true }) namingLoader!: Loader;

  private namingFormHouseSub = Subscription.EMPTY;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly housesService: HousesService,
    private readonly notificationsService: NotificationsService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef,
    private readonly fb: FormBuilder
  ) {
    this.namingForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(HouseValidation.MAX_NAME_LENGTH)]),
      description: this.fb.control('', [Validators.maxLength(HouseValidation.MAX_DESCRIPTION_LENGTH)])
    });
  }

  ngOnInit(): void {
    this.namingFormHouseSub = this.house$.subscribe((house) => {
      const namingForm: NamingUpdateForm = {
        name: house.name,
        description: house.description ?? ''
      };
      this.namingForm.reset(namingForm);
    });
  }

  ngOnDestroy(): void {
    this.namingFormHouseSub.unsubscribe();
  }

  handleDeleteHouseClick() {
    this.house$
      .pipe(
        first(),
        switchMap((house) => {
          return this.dialog
            .open<HouseDeleteConfirmDialogComponent, HouseDeleteConfirmDialogInput>(HouseDeleteConfirmDialogComponent, {
              autoFocus: false,
              data: {
                id: house.id,
                name: house.name
              }
            })
            .afterClosed();
        }),
        switchMap((res?: HouseDeleteConfirmDialogResult) => {
          if (res?.confirmed === true) {
            return this.dangerLoader.operationOn(this.housesService.deleteHouse(res.id));
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.notificationsService.success('House deleted');
        this.deleted = true;
        this.cd.markForCheck();
        this.router.navigate(['']);
      }, this.notificationsService.handleError);
  }

  handleNamingUpdateSubmit(value: NamingUpdateForm) {
    this.house$
      .pipe(
        first(),
        switchMap((house) =>
          this.namingLoader.operationOn(
            this.housesService.updateHouseBasicInfo({
              id: house.id,
              name: value.name,
              description: value.description
            })
          )
        )
      )
      .subscribe((house) => {
        this.notificationsService.success('House updated');
      }, this.notificationsService.handleError);
  }
}
