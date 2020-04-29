import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { map, shareReplay } from 'rxjs/operators';
import { CurrentHouse } from '@hrh/houses/_models/house.model';
import { ActivatedRoute } from '@angular/router';
import { CurrentHousesCountResolver } from '@hrh/houses/_resolver/current-houses-count.resolver';

@Component({
  selector: 'hrh-user-houses',
  templateUrl: './user-houses.component.html',
  styleUrls: ['./user-houses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHousesComponent implements OnInit {
  housesCount$ = this.activatedRoute.data.pipe(map(CurrentHousesCountResolver.extract), map(Array), shareReplay(1));
  houses$ = this.housesService.getCurrentUserHouses().pipe(shareReplay(1));

  constructor(private readonly housesService: HousesService, private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
