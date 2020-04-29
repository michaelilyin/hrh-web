import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-house-card-placeholder',
  templateUrl: './house-card-placeholder.component.html',
  styleUrls: ['./house-card-placeholder.component.scss', '../house-card/house-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseCardPlaceholderComponent implements OnInit {
  @Input() addNewOverlay = false;

  constructor() {}

  ngOnInit(): void {}
}
