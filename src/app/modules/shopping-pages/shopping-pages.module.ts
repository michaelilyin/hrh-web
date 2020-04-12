import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingPagesRoutingModule } from './shopping-pages-routing.module';
import { ShoppingShellComponent } from './shopping-shell/shopping-shell.component';

@NgModule({
  declarations: [ShoppingShellComponent],
  imports: [CommonModule, ShoppingPagesRoutingModule]
})
export class ShoppingPagesModule {}
