import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-house-dashboard',
  templateUrl: './house-dashboard.component.html',
  styleUrls: ['./house-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
