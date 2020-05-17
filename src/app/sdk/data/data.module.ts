import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDsDirective } from './material/ds/mat-table-ds.directive';
import { DsMatPaginatorComponent } from './material/ds-mat-paginator/ds-mat-paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [MatTableDsDirective, DsMatPaginatorComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule],
  exports: [MatTableModule, MatProgressSpinnerModule, MatTableDsDirective, DsMatPaginatorComponent]
})
export class DataModule {}
