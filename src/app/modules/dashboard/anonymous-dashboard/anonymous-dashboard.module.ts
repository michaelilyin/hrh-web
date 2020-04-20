import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnonymousDashboardRoutingModule } from './anonymous-dashboard-routing.module';
import { AnonymousDashboardComponent } from './anonymous-dashboard/anonymous-dashboard.component';

@NgModule({
  declarations: [AnonymousDashboardComponent],
  imports: [CommonModule, AnonymousDashboardRoutingModule]
})
export class AnonymousDashboardModule {}
