import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { CurrentHouse } from '@hrh/houses/_models/house.model';
import { ActivatedRoute } from '@angular/router';
import { CurrentHousesCountResolver } from '@hrh/houses/_resolver/current-houses-count.resolver';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';
import { EMPTY, of } from 'rxjs';
import { KnownError } from '@hrh/sdk/notifications/_models/notification-component.model';

@Component({
  selector: 'hrh-user-houses',
  templateUrl: './user-houses.component.html',
  styleUrls: ['./user-houses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHousesComponent implements OnInit {
  housesCount$ = this.activatedRoute.data.pipe(
    map(CurrentHousesCountResolver.extract),
    map((size) => Array(size)),
    shareReplay(1)
  );
  houses$ = this.housesService.getCurrentUserHouses().pipe(
    catchError((error: KnownError) => {
      this.notificationsService.error(error);
      return EMPTY;
    }),
    shareReplay(1)
  );

  constructor(
    private readonly housesService: HousesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}
}
