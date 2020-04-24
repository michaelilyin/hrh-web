import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { shareReplay } from 'rxjs/operators';
import { CurrentHouse } from '@hrh/houses/_models/house.model';

@Component({
  selector: 'hrh-user-houses',
  templateUrl: './user-houses.component.html',
  styleUrls: ['./user-houses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHousesComponent implements OnInit {
  houses$ = this.housesService.getCurrentUserHouses().pipe(shareReplay(1));

  house: CurrentHouse = {
    id: '123',
    name: 'Test House',
    info: 'Test Info Line'
  };

  constructor(private readonly housesService: HousesService) {}

  ngOnInit(): void {}
}
