import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-house-settings',
  templateUrl: './house-settings.component.html',
  styleUrls: ['./house-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseSettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
