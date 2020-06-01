import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDsDirective } from './material/ds/mat-table-ds.directive';
import { DsMatPaginatorComponent } from './material/ds-mat-paginator/ds-mat-paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DsMatSorterDirective } from './material/ds-mat-sorter/ds-mat-sorter.directive';
import { MatSortModule } from '@angular/material/sort';
import { FilterForDirective } from './form/filter-for.directive';
import { DsRouterStoreDirective } from './store/ds-router-store.directive';
import { LoadMoreFixtureComponent } from '@hrh/sdk/data/commons/load-more-fixture/load-more-fixture.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MatTableDsDirective,
    DsMatPaginatorComponent,
    DsMatSorterDirective,
    FilterForDirective,
    DsRouterStoreDirective,
    LoadMoreFixtureComponent
  ],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatButtonModule],
  exports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatTableDsDirective,
    DsMatPaginatorComponent,
    DsMatSorterDirective,
    FilterForDirective,
    DsRouterStoreDirective,
    LoadMoreFixtureComponent
  ]
})
export class DataModule {}
