import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseValidation } from '@hrh/houses/_validation/house.validation';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';
import { DOCUMENT, Location } from '@angular/common';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';
import { finalize } from 'rxjs/operators';

interface CreateHouseForm {
  name: string;
  description: string;
}

@Component({
  selector: 'hrh-new-house',
  templateUrl: './new-house.component.html',
  styleUrls: ['./new-house.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewHouseComponent implements OnInit {
  readonly form: FormGroup;

  readonly HouseValidation = HouseValidation;

  created = false;

  @ViewChild(Loader, { static: true }) loader!: Loader;

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly housesService: HousesService,
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(HouseValidation.MAX_NAME_LENGTH)]),
      description: this.fb.control('', [Validators.maxLength(HouseValidation.MAX_DESCRIPTION_LENGTH)])
    });
  }

  ngOnInit(): void {}

  createHouse(value: CreateHouseForm) {
    const createHouse$ = this.housesService.createHouse({
      name: value.name,
      description: value.description
    });

    this.loader.operationOn(createHouse$).subscribe(() => {
      this.notificationsService.success('House created');
      this.created = true;
      this.cd.markForCheck();
      this.location.back();
    }, this.notificationsService.handleError);
  }
}
