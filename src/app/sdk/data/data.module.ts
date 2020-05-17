import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDsDirective } from './material/ds/mat-table-ds.directive';
import { DsMatPaginatorComponent } from './material/ds-mat-paginator/ds-mat-paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DsMatSorterDirective } from './material/ds-mat-sorter/ds-mat-sorter.directive';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [MatTableDsDirective, DsMatPaginatorComponent, DsMatSorterDirective],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule],
  exports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatTableDsDirective,
    DsMatPaginatorComponent,
    DsMatSorterDirective
  ]
})
export class DataModule {}
