import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsDemoComponent } from './charts-demo/charts-demo.component';
import { HelloComponent } from './hello/hello.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsDemoComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'hello'
      },
      {
        path: 'hello',
        component: HelloComponent
      },
      {
        path: 'apex',
        loadChildren: () => import('./apex/apex.module').then((m) => m.ApexModule)
      },
      {
        path: 'plotly',
        loadChildren: () => import('./plotly/plotly-module-pages.module').then((m) => m.PlotlyModulePages)
      },
      {
        path: 'ngx-charts',
        loadChildren: () => import('./ngx-charts-demo/ngx-charts-demo.module').then((m) => m.NgxChartsDemoModule)
      },
      {
        path: 'chartjs',
        loadChildren: () => import('./chartjs-demo/chartjs-demo.module').then((m) => m.ChartjsDemoModule)
      },
      {
        path: 'canvasjs',
        loadChildren: () => import('./canvasjs/cancas-js-demo.module').then((m) => m.CancasJsDemoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartProtoRoutingModule {}
