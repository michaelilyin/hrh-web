import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousDashboardComponent } from './anonymous-dashboard/anonymous-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AnonymousDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnonymousDashboardRoutingModule {}
