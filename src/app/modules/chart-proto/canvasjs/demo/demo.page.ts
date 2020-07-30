import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { pie, volume1, volume2 } from '../../data';
// @ts-ignore
import * as CanvasJS from '../canvasjs.min';
// import * as CanvasJS from 'canvasjs';

@Component({
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('line') line!: ElementRef;
  @ViewChild('circle') circle!: ElementRef;
  private lineChart?: CanvasJS.Chart;
  private circleChart?: CanvasJS.Chart;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // tslint:disable no-unsafe-any
    this.lineChart = new CanvasJS.Chart('line', {
      animationEnabled: true,
      title: {
        text: 'Call Volume:',
        fontFamily: 'Roboto',
        fontSize: 24
      },
      data: [
        {
          name: 'Encounter Volume',
          showInLegend: true,
          legendMarkerType: 'square',
          dataPoints: volume1.map((v) => ({ y: v.y, label: v.x })),
          type: 'area',
          color: '#6FC5CC',
          markerSize: 0
        },
        {
          name: 'Complex Encounter (ER, Video, Urgent, Etc.)',
          showInLegend: true,
          legendMarkerType: 'square',
          dataPoints: volume2.map((v) => ({ y: v.y, label: v.x })),
          type: 'area',
          color: '#CE252B',
          markerSize: 0
        }
      ],
      legend: {
        horizontalAlign: 'right'
      }
    });
    // tslint:disable no-unsafe-any
    this.lineChart?.render?.();

    // tslint:disable no-unsafe-any
    this.circleChart = new CanvasJS.Chart('circle', {
      animationEnabled: true,
      title: {
        text: 'Active Outcomes: Jul 1 - Jul 2',
        fontFamily: 'Roboto',
        fontSize: 24
      },
      data: [
        {
          name: 'Encounter Volume',
          showInLegend: true,
          legendMarkerType: 'square',
          dataPoints: pie.map((v) => ({ y: v.value, label: v.name, color: v.color })),
          type: 'pie'
        }
      ]
    });
    // tslint:disable no-unsafe-any
    this.circleChart?.render?.();
  }

  ngOnDestroy(): void {
    // tslint:disable no-unsafe-any
    this.lineChart?.destroy?.();
    // tslint:disable no-unsafe-any
    this.circleChart?.destroy?.();
  }
}
