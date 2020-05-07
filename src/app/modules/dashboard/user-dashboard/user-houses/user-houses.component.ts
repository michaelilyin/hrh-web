import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CurrentHousesCountResolver } from '../_resolver/current-houses-count.resolver';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';

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
    this.notificationsService.catchError(() => []),
    shareReplay(1)
  );

  constructor(
    private readonly housesService: HousesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}
}
