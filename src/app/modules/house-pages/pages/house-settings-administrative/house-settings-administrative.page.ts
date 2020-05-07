import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';
import { Router } from '@angular/router';
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
import { HouseContextService } from '../../_context/house.context';
import { House } from '@hrh/houses/_models/house.model';

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
  private house$ = this.houseContextService.context$ ?? EMPTY;

  deleted = false;
  namingForm!: FormGroup;
  readonly HouseValidation = HouseValidation;

  @ViewChild('danger', { read: Loader, static: true }) dangerLoader!: Loader;
  @ViewChild('naming', { read: Loader, static: true }) namingLoader!: Loader;

  private namingFormHouseSub = Subscription.EMPTY;

  constructor(
    private readonly houseContextService: HouseContextService,
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
      if (house == undefined) {
        this.namingForm.reset();
        return;
      }
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
    this.dangerLoader
      .operationOn(
        this.house$.pipe(
          first(),
          switchMap((house) => this.confirmDeleteHouse(house)),
          switchMap((res?: HouseDeleteConfirmDialogResult) => {
            if (res?.confirmed === true) {
              return this.housesService.deleteHouse(res.id);
            }
            return EMPTY;
          })
        )
      )
      .subscribe(() => {
        this.notificationsService.success('House deleted');
        this.deleted = true;
        this.cd.markForCheck();
        this.router.navigate(['']);
      }, this.notificationsService.handleError);
  }

  private confirmDeleteHouse(house: House | undefined): Observable<HouseDeleteConfirmDialogResult | undefined> {
    if (house == undefined) {
      return EMPTY;
    }
    return this.dialog
      .open<HouseDeleteConfirmDialogComponent, HouseDeleteConfirmDialogInput, HouseDeleteConfirmDialogResult>(
        HouseDeleteConfirmDialogComponent,
        {
          autoFocus: false,
          data: {
            id: house.id,
            name: house.name
          }
        }
      )
      .afterClosed();
  }

  handleNamingUpdateSubmit(value: NamingUpdateForm) {
    this.namingLoader
      .operationOn(
        this.house$.pipe(
          first(),
          switchMap((house) => {
            if (house == undefined) {
              return EMPTY;
            }
            return this.housesService.updateHouseBasicInfo({
              id: house.id,
              name: value.name,
              description: value.description
            });
          }),
          switchMap((house) => this.houseContextService.refresh(house))
        )
      )
      .subscribe((house) => {
        this.notificationsService.success('House updated');
      }, this.notificationsService.handleError);
  }
}
