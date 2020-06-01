import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { DataSource } from '@hrh/sdk/data/commons/ds.model';
import { NgModel } from '@angular/forms';
import { Changes } from '@hrh/sdk/angular/changes/changes.model';
import { EMPTY, fromEvent, merge, NEVER, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilterType, Filter, FilterState, FilterFields } from '../commons/filter.model';
import { Paginator } from '@hrh/sdk/data/commons/pagination/paginator.model';

function formatValue(value: unknown | undefined) {
  return typeof value === 'string' && value?.trim() === '' ? undefined : value ?? undefined;
}

@Directive({
  selector: '[hrhFilterFor]'
})
export class FilterForDirective implements OnInit, OnChanges, OnDestroy {
  @Input() hrhFilterFor!: DataSource<unknown>;
  @Input() type!: FilterType;

  private filter?: Filter;
  private paginator?: Paginator;
  private state?: FilterState<FilterFields>;

  private filterSub = Subscription.EMPTY;
  private changeSub = Subscription.EMPTY;

  constructor(
    private readonly ngModel: NgModel,
    private readonly cd: ChangeDetectorRef,
    private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.getChangeStream().subscribe((value) => {
      if (this.filter != undefined) {
        const filterValue = formatValue(this.state?.fields[this.ngModel.name]?.value);
        const newValue = formatValue(value);
        if (newValue !== filterValue) {
          this.filter.requestState({
            fields: {
              [this.ngModel.name]: {
                value: newValue,
                type: this.type
              }
            }
          });
        }
      }
    });
  }

  ngOnChanges(changes: Changes<this>): void {
    if (changes.hrhFilterFor != undefined) {
      this.setNewDataSource(changes.hrhFilterFor.currentValue);
      if (this.filter != undefined) {
        this.filter.requestState({
          fields: {
            [this.ngModel.name]: {
              type: this.type,
              value: formatValue(this.ngModel.value)
            }
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
    this.changeSub.unsubscribe();
  }

  private getChangeStream(): Observable<unknown> {
    if (this.type === 'text') {
      const element = (this.elementRef.nativeElement as HTMLElement).getElementsByClassName('mat-input-element');
      return merge(
        fromEvent<FocusEvent>(element, 'blur'),
        fromEvent<KeyboardEvent>(this.elementRef.nativeElement as HTMLElement, 'keydown').pipe(
          filter((event: KeyboardEvent) => event.code === 'Enter')
        ),
        this.ngModel.valueChanges?.pipe(filter((value) => value == undefined)) ?? NEVER
      ).pipe(map((_) => this.ngModel.value as unknown));
    }
    return this.ngModel.valueChanges ?? EMPTY;
  }

  private setNewDataSource(dataSource: DataSource<unknown> | undefined) {
    this.filter = dataSource?.filter;
    this.paginator = dataSource?.paginator;
    this.filterSub.unsubscribe();
    this.filterSub =
      this.filter?.state$.subscribe((state) => {
        this.state = state;
        this.ngModel.reset(state.fields[this.ngModel.name]?.value ?? '');
        this.cd.markForCheck();
      }) ?? Subscription.EMPTY;
  }
}
