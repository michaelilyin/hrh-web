import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';
import { pie, volume1, volume2 } from '../../data';

@Component({
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPage implements OnInit {
  lineSeries: ApexAxisChartSeries = [
    {
      name: 'Complex Encounter (ER, Video, Urgent, Etc.)',
      data: volume2.map((d) => ({
        ...d
      }))
    },
    {
      name: 'Encounter Volume',
      data: volume1.map((d) => ({
        ...d
      }))
    }
  ];
  lineChart: ApexChart = {
    type: 'area',
    height: 500,
    fontFamily: 'Roboto'
  };
  lineTitle: ApexTitleSubtitle = {
    text: 'Call Volume:',
    style: {
      fontSize: '24px'
    }
  };
  lineXAxis: ApexXAxis = {};
  lineYAxis: ApexYAxis = {
    min: 0,
    max: 10
  };
  lineLegend: ApexLegend = {
    position: 'top',
    horizontalAlign: 'right'
  };
  lineStroke: ApexStroke = {
    curve: 'straight',
    show: false,
    colors: ['#CE252B', '#6FC5CC']
  };
  lineDataLabels: ApexDataLabels = {
    enabled: false
  };
  lineMarkers: ApexMarkers = {};
  lineColors = ['#CE252B', '#6FC5CC'];
  lineFill: ApexFill = {
    colors: ['#CE252B', '#6FC5CC'],
    opacity: 1,
    type: 'solid'
  };
  linePlotOptions: ApexPlotOptions = {
    area: {}
  };

  circleSeries: ApexNonAxisChartSeries = pie.map((d) => d.value);
  circleChart: ApexChart = {
    type: 'pie',
    fontFamily: 'Roboto',
    height: 500
  };
  circleTitle: ApexTitleSubtitle = {
    text: 'Active Outcomes: Jul 1 - Jul 2',
    style: {
      fontSize: '24px'
    }
  };
  circleLabels = pie.map((d) => d.name);
  circleColors = pie.map((d) => d.color);
  circleLegend: ApexLegend = {
    position: 'left',
    containerMargin: {
      top: 16
    },
    floating: true,
    itemMargin: {
      vertical: 8
    },
    offsetY: 16
  };
  circlePlotOptions: ApexPlotOptions = {
    pie: {}
  };

  constructor() {}

  ngOnInit(): void {}
}
