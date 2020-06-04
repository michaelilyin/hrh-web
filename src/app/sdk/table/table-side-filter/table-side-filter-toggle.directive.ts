import { Directive, HostListener, Input } from '@angular/core';
import { TableSideFilterComponent } from '@hrh/sdk/table/table-side-filter/table-side-filter.component';

@Directive({
  selector: '[hrhTableSideFilterToggle]'
})
export class TableSideFilterToggleDirective {
  @Input() for!: TableSideFilterComponent;

  constructor() {}

  // tslint:disable-next-line:no-unsafe-any
  @HostListener('click') click(): void {
    this.for.toggle();
  }
}
