import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import { DataSource, Paginator, Sorter } from '@hrh/sdk/data/commons/ds.model';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[matSort][hrhMatTableDs]'
})
export class DsMatSorterDirective implements OnInit, OnDestroy {
  private sorter?: Sorter;
  private paginator?: Paginator;

  private sortSub = Subscription.EMPTY;
  private sortChangeSub = Subscription.EMPTY;

  constructor(
    private readonly matSort: MatSort,
    private readonly ds: DataSource<unknown>,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setNewDataSource(this.ds);
    if (this.sorter != undefined) {
      this.sorter.requestState({
        fields:
          this.matSort.active === '' || this.matSort.direction === ''
            ? []
            : [
                {
                  name: this.matSort.active,
                  direction: this.matSort.direction
                }
              ]
      });
    }
    if (this.paginator != undefined) {
      this.paginator.requestState({
        offset: 0
      });
    }

    // skip first emitted sort event from mat sort
    this.sortChangeSub = this.matSort.sortChange.subscribe((sort: Sort) => {
      this.handleSortChange(sort);
    });
  }

  ngOnDestroy(): void {
    this.sortSub.unsubscribe();
    this.sortChangeSub.unsubscribe();
  }

  private handleSortChange(sort: Sort) {
    if (this.sorter != undefined) {
      this.sorter.requestState({
        fields:
          sort.direction === ''
            ? []
            : [
                {
                  name: sort.active,
                  direction: sort.direction
                }
              ]
      });
    }
    if (this.paginator != undefined) {
      this.paginator.requestState({
        offset: 0
      });
    }
  }

  private setNewDataSource(dataSource: DataSource<unknown> | undefined) {
    this.paginator = dataSource?.paginator;
    this.sorter = dataSource?.sorter;
    this.sortSub.unsubscribe();
    this.sortSub =
      this.sorter?.state$.subscribe((state) => {
        this.matSort.active = state.fields[0]?.name;
        this.matSort.direction = state.fields[0]?.direction;

        this.cd.markForCheck();
      }) ?? Subscription.EMPTY;
  }
}
