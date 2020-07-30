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
import * as Chart from 'chart.js';
import { pie, volume1, volume2 } from '../../data';

@Component({
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('line') line!: ElementRef;
  @ViewChild('circle') circle!: ElementRef;
  private lineChart?: Chart;
  private circleChart?: Chart;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.lineChart = new Chart(this.line.nativeElement as HTMLCanvasElement, {
      type: 'line',
      data: {
        datasets: [
          {
            data: volume2.map((v) => v.y),
            backgroundColor: '#CE252B',
            lineTension: 0,
            label: 'Complex Encounter (ER, Video, Urgent, Etc.)',
            borderWidth: 0,
            pointRadius: 0,
            pointHitRadius: 5
          },
          {
            data: volume1.map((v) => v.y),
            backgroundColor: '#6FC5CC',
            lineTension: 0,
            label: 'Encounter Volume',
            borderWidth: 0,
            pointRadius: 0,
            pointHitRadius: 5
          }
        ],
        labels: volume1.map((v) => v.x)
      },
      options: {
        legend: {
          align: 'end'
        },
        title: {
          text: 'Call Volume:',
          fontSize: 24,
          display: true,
          position: 'top',
          fontFamily: 'Roboto'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMax: 10
              }
            }
          ]
        },
        responsive: false
      }
    });
    this.circleChart = new Chart(this.circle.nativeElement as HTMLCanvasElement, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: pie.map((p) => p.value),
            backgroundColor: pie.map((p) => p.color)
          }
        ],
        labels: pie.map((p) => p.name)
      },
      options: {
        legend: {
          align: 'start',
          position: 'left'
        },
        title: {
          text: 'Active Outcomes: Jul 1 - Jul 2',
          fontSize: 24,
          display: true,
          position: 'top',
          fontFamily: 'Roboto'
        },
        responsive: false
      }
    });
  }

  ngOnDestroy(): void {
    this.lineChart?.destroy?.();
    this.circleChart?.destroy?.();
  }
}
