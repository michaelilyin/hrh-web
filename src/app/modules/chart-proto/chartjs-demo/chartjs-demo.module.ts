import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartjsDemoRoutingModule } from './chartjs-demo-routing.module';
import { DemoPage } from './demo/demo.page';
import 'chart.js';

@NgModule({
  declarations: [DemoPage],
  imports: [CommonModule, ChartjsDemoRoutingModule]
})
export class ChartjsDemoModule {}
