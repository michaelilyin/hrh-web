import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyRoutingModule } from './plotly-routing.module';
import * as PlotlyJS from 'plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { DemoPage } from './demo/demo.page';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [DemoPage],
  imports: [CommonModule, PlotlyRoutingModule, PlotlyModule]
})
export class PlotlyModulePages {}
