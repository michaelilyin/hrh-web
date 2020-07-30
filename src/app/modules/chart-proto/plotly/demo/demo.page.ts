import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { pie, volume1, volume2 } from '../../data';
import * as Plotly from 'plotly.js';

@Component({
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPage implements OnInit {
  lineData: Plotly.Data[] = [
    {
      x: volume1.map((v) => v.x).slice(1),
      y: volume1.map((v) => v.y).slice(1),
      type: 'scatter',
      fill: 'tozeroy',
      fillcolor: '#6FC5CC',
      line: {
        color: '#6FC5CC'
      },
      marker: {
        color: '#6FC5CC'
      },
      name: 'Encounter Volume'
    },
    {
      x: volume2.map((v) => v.x).slice(1),
      y: volume2.map((v) => v.y).slice(1),
      type: 'scatter',
      fill: 'tozeroy',
      fillcolor: '#CE252B',
      marker: {
        color: '#CE252B'
      },
      line: {
        color: '#CE252B'
      },
      name: 'Complex Encounter (ER, Video, Urgent, Etc.)'
    }
  ];
  lineLayout: Partial<Plotly.Layout> = {
    height: 500,
    title: 'Call Volume:',
    titlefont: {
      size: 24
    },
    font: { family: 'Roboto' },
    legend: {
      xanchor: 'right',
      yanchor: 'top'
    }
  };
  lineConfig: Partial<Plotly.Config> = {};

  circleData: Plotly.Data[] = [
    {
      values: pie.map((v) => v.value),
      labels: pie.map((v) => v.name),
      colorscale: pie.map((v) => v.color),
      'line.color': pie.map((v) => v.color),
      'marker.color': pie.map((v) => v.color),
      type: 'pie',
      marker: {
        colors: pie.map((v) => v.color)
      }
    }
  ];
  circleLayout: Partial<Plotly.Layout> = {
    height: 500,
    title: 'Active Outcomes: Jul 1 - Jul 2',
    titlefont: {
      size: 24
    },
    font: { family: 'Roboto' },
    legend: {
      xanchor: 'left',
      yanchor: 'middle'
    }
  };

  constructor() {}

  ngOnInit(): void {}
}
