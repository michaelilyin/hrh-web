import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancasJsDemoRoutingModule } from './cancas-js-demo-routing.module';
import { DemoPage } from './demo/demo.page';

@NgModule({
  declarations: [DemoPage],
  imports: [CommonModule, CancasJsDemoRoutingModule]
})
export class CancasJsDemoModule {}
