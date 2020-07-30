import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { pie, volume1, volume2 } from '../../data';

@Component({
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit {
  lineResults = [
    {
      name: 'Encounter Volume',
      series: volume1.map((s, i) => ({ name: s.x, value: s.y }))
    },
    {
      name: 'Complex Encounter (ER, Video, Urgent, Etc.)',
      series: volume2.map((s, i) => ({ name: s.x, value: s.y }))
    }
  ];
  lineColorScheme = {
    domain: ['#6FC5CC', '#CE252B']
  };

  circleResults = pie.map((p) => ({
    name: p.name,
    value: p.value
  }));
  circleColors = {
    domain: pie.map((p) => p.color)
  };

  constructor() {}

  ngOnInit(): void {}
}
