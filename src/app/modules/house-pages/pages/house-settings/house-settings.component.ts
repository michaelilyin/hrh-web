import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { Loader } from '@hrh/sdk/layout/loader/loader.component';

@Component({
  selector: 'hrh-house-settings',
  templateUrl: './house-settings.component.html',
  styleUrls: ['./house-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseSettingsComponent {}
