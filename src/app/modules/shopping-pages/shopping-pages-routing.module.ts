import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingShellComponent } from './shopping-shell/shopping-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingPagesRoutingModule {}
