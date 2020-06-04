import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableContainerComponent } from './table-container/table-container.component';
import { TableSideFilterComponent } from './table-side-filter/table-side-filter.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TableSideFilterDirective } from './table-side-filter/table-side-filter.directive';
import { TableSideFilterToggleDirective } from './table-side-filter/table-side-filter-toggle.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TableContainerComponent,
    TableSideFilterComponent,
    TableSideFilterDirective,
    TableSideFilterToggleDirective
  ],
  exports: [
    TableContainerComponent,
    TableSideFilterComponent,
    TableSideFilterDirective,
    TableSideFilterToggleDirective
  ],
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatIconModule]
})
export class TableModule {}
