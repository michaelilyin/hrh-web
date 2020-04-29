import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CurrentHouse } from '@hrh/houses/_models/house.model';

@Component({
  selector: 'hrh-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseCardComponent implements OnInit {
  @Input() house?: CurrentHouse;

  constructor() {}

  ngOnInit(): void {}
}
