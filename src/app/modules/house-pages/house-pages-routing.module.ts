import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewHouseComponent } from './pages/new-house/new-house.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewHouseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousePagesRoutingModule {}
