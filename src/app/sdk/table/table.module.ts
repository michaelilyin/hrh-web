import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableContainerComponent } from './table-container/table-container.component';

@NgModule({
  declarations: [TableContainerComponent],
  exports: [TableContainerComponent],
  imports: [CommonModule]
})
export class TableModule {}
