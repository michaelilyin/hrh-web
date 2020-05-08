import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnonymousDashboardRoutingModule } from './anonymous-dashboard-routing.module';
import { AnonymousDashboardComponent } from './anonymous-dashboard/anonymous-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@hrh/sdk/layout/layout.module';
import { MessageModule } from '@hrh/message/message.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AnonymousDashboardComponent],
  imports: [
    CommonModule,
    AnonymousDashboardRoutingModule,
    MatCardModule,
    LayoutModule,
    MessageModule,
    MatListModule,
    MatTooltipModule
  ]
})
export class AnonymousDashboardModule {}
