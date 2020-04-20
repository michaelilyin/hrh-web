import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'hrh-user-houses',
  templateUrl: './user-houses.component.html',
  styleUrls: ['./user-houses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHousesComponent implements OnInit {
  houses$ = this.housesService.getCurrentUserHouses().pipe(shareReplay(1));

  constructor(private readonly housesService: HousesService) {}

  ngOnInit(): void {}
}
