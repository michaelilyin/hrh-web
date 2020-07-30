import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsDemoComponent } from './charts-demo/charts-demo.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsDemoComponent,
    children: [
      {
        path: 'apex',
        loadChildren: () => import('./apex/apex.module').then((m) => m.ApexModule)
      },
      {
        path: 'plotly',
        loadChildren: () => import('./plotly/plotly-module-pages.module').then((m) => m.PlotlyModulePages)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartProtoRoutingModule {}
