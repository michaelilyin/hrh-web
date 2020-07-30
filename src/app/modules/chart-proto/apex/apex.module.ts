import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApexRoutingModule } from './apex-routing.module';
import { DemoPage } from './demo/demo.page';
import { NgApexchartsModule } from 'ng-apexcharts';

import 'node_modules/apexcharts/dist/apexcharts.min.js';

@NgModule({
  declarations: [DemoPage],
  imports: [CommonModule, ApexRoutingModule, NgApexchartsModule]
})
export class ApexModule {}
