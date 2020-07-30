import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApexRoutingModule } from './apex-routing.module';
import { DemoPage } from './demo/demo.page';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [DemoPage],
  imports: [CommonModule, ApexRoutingModule, NgApexchartsModule]
})
export class ApexModule {}
