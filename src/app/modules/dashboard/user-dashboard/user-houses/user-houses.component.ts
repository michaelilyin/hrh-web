import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CurrentHousesCountResolver } from '../_resolver/current-houses-count.resolver';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';
import { combineLatest, Observable } from 'rxjs';
import { CurrentHouse } from '@hrh/houses/_models/house.model';

@Component({
  selector: 'hrh-user-houses',
  templateUrl: './user-houses.component.html',
  styleUrls: ['./user-houses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHousesComponent implements OnInit {
  readonly houses$: Observable<CurrentHouse[]> = combineLatest([
    this.activatedRoute.data.pipe(map(CurrentHousesCountResolver.extract)),
    this.housesService.streamCurrentUserHouses().pipe(startWith([]))
  ]).pipe(
    map(([count, items]) => {
      const placeholders: CurrentHouse[] = Array.from(Array(items.length));
      for (let i = 0; i < count; i++) {
        placeholders[i] = items[i];
      }
      return placeholders;
    }),
    this.notificationsService.catchError(() => []),
    shareReplay(1)
  );

  placeholderTrack: TrackByFunction<CurrentHouse> = (i, h) => (h == undefined ? i : h.id);

  constructor(
    private readonly housesService: HousesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}
}
