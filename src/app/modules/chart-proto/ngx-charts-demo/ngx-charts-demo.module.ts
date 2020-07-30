import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxChartsDemoRoutingModule } from './ngx-charts-demo-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [CommonModule, NgxChartsDemoRoutingModule, NgxChartsModule]
})
export class NgxChartsDemoModule {}
