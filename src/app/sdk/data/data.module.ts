import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDsDirective } from './material/mat-table-ds.directive';

@NgModule({
  declarations: [MatTableDsDirective],
  imports: [CommonModule, MatTableModule],
  exports: [MatTableModule, MatTableDsDirective]
})
export class DataModule {}
