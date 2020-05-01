import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseInfoResolver } from '@hrh/houses/_resolver/house-info.resolver';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'hrh-house-dashboard',
  templateUrl: './house-dashboard.component.html',
  styleUrls: ['./house-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseDashboardComponent implements OnInit {
  readonly house$ = this.activatedRoute.data.pipe(map(HouseInfoResolver.extract), shareReplay(1));

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
