import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartProtoRoutingModule } from './chart-proto-routing.module';
import { ChartsDemoComponent } from './charts-demo/charts-demo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { HelloComponent } from './hello/hello.component';

@NgModule({
  declarations: [ChartsDemoComponent, HelloComponent],
  imports: [CommonModule, ChartProtoRoutingModule, MatToolbarModule, MatTabsModule]
})
export class ChartProtoModule {}
