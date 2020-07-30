import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './charts-demo.component.html',
  styleUrls: ['./charts-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsDemoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
