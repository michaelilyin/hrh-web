import { Directive, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@hrh/sdk/data/store/store.model';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { DataRequest, FilterRequest, PageRequest, SortRequest } from '@hrh/sdk/data/model/data-request.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FilterField, FilterFields, FilterType } from '@hrh/sdk/data/commons/filter.model';
import { readUrlString, writeUrlString } from '@hrh/sdk/api/ values/string';
import { readUrlInt, writeUrlInt } from '@hrh/sdk/api/ values/int';
import { SortField } from '@hrh/sdk/data/commons/sorter.model';
import { first, skip } from 'rxjs/operators';

function shortenFilter(type: FilterType): string {
  switch (type) {
    case 'text':
      return 't';
    case 'date':
      return 'd';
    case 'datetime':
      return 'dt';
    case 'number':
      return 'n';
  }
}

function unShortenFilter(val: string | undefined): FilterType {
  if (val == undefined) {
    return 'text';
  }
  switch (val) {
    case 't':
      return 'text';
    case 'd':
      return 'date';
    case 'dt':
      return 'datetime';
    case 'n':
      return 'number';
  }
  return 'text';
}

function serializeFilterValue(value: FilterField<unknown>) {
  if (value.value == undefined) {
    return '';
  }
  switch (value.type) {
    case 'text':
      return writeUrlString(value.value as string | undefined);
  }
  return '';
}

function deserializeFilterValue(type: FilterType, value: string | undefined): FilterField<unknown> | undefined {
  switch (type) {
    case 'text':
      return {
        type,
        value: readUrlString(value)
      };
  }
  return undefined;
}

function readSortDirection(value: string | null): 'asc' | 'desc' | undefined {
  const sort = value?.trim()?.toLocaleLowerCase();
  if (sort === 'asc') {
    return 'asc';
  }
  if (sort === 'desc') {
    return 'desc';
  }
  return undefined;
}

function readPage(prefix: string, paramMap: ParamMap): PageRequest {
  return {
    limit: readUrlInt(paramMap.get(`${prefix}.p.l`)) ?? 10,
    offset: readUrlInt(paramMap.get(`${prefix}.p.o`)) ?? 10
  };
}

function readSort(prefix: string, paramMap: ParamMap): SortRequest {
  const sortPrefix = `${prefix}.s.f.`;
  const fields: SortField[] = [];

  paramMap.keys.forEach((key) => {
    if (!key.startsWith(sortPrefix)) {
      return;
    }
    const dir = readSortDirection(paramMap.get(key));
    if (dir == undefined) {
      return;
    }
    fields.push({
      name: key.substring(sortPrefix.length),
      direction: dir
    });
  });

  return {
    fields
  };
}

function readFilter(prefix: string, paramMap: ParamMap): FilterRequest {
  const filterPrefix = `${prefix}.f.f.`;
  const fields: FilterFields = {};

  paramMap.keys.forEach((key) => {
    if (!key.startsWith(filterPrefix)) {
      return;
    }

    const unprefixed = key.substring(filterPrefix.length);
    const name = unprefixed.substring(0, unprefixed.indexOf('.'));

    if (fields[name] != undefined) {
      return;
    }

    const type = unShortenFilter(readUrlString(paramMap.get(`${filterPrefix}${name}.t`)));
    const textValue = readUrlString(paramMap.get(`${filterPrefix}${name}.v`));
    const value = deserializeFilterValue(type, textValue);

    if (value != undefined) {
      fields[name] = value;
    }
  });

  return {
    fields
  };
}

@Directive({
  selector: '[hrhDsRouterStore]',
  providers: [
    {
      provide: Store,
      useExisting: forwardRef(() => DsRouterStoreDirective)
    }
  ]
})
export class DsRouterStoreDirective extends Store implements OnInit, OnDestroy {
  @Input('hrhDsRouterStore') key = 'ds';

  readonly saveRequest$ = new ReplaySubject<DataRequest>(1);

  readonly initialized$ = new ReplaySubject<DataRequest | undefined>(1);
  readonly savedRequest$ = new ReplaySubject<DataRequest | undefined>(1);

  private saveSub = Subscription.EMPTY;
  private readSub = Subscription.EMPTY;

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.saveSub = this.saveRequest$.subscribe((request) => {
      const fg = Date.now();

      const sort: { [p: string]: string | null } = {};
      request.sort.fields.forEach((sf) => {
        if (sf.direction == undefined) {
          sort[`${this.key}.s.f.${sf.name}`] = null;
        } else {
          sort[`${this.key}.s.f.${sf.name}`] = writeUrlString(sf.direction);
        }
      });

      const filer: { [p: string]: string | null } = {};
      Object.entries(request.filter.fields).forEach(([name, value]) => {
        if (value.value == undefined || (value.value as string) === '') {
          filer[`${this.key}.f.f.${name}.t`] = null;
          filer[`${this.key}.f.f.${name}.v`] = null;
          return;
        }
        filer[`${this.key}.f.f.${name}.t`] = writeUrlString(shortenFilter(value.type));
        filer[`${this.key}.f.f.${name}.v`] = serializeFilterValue(value);
      });

      this.router.navigate(['.'], {
        queryParams: {
          [`${this.key}.fg`]: fg,
          [`${this.key}.p.o`]: writeUrlInt(request.page.offset),
          [`${this.key}.p.l`]: writeUrlInt(request.page.limit),
          ...sort,
          ...filer
        },
        relativeTo: this.activatedRoute,
        replaceUrl: true,
        queryParamsHandling: 'merge'
      });
    });

    this.activatedRoute.queryParamMap.pipe(first()).subscribe((initialMap) => {
      if (initialMap.has(`${this.key}.fg`)) {
        const request: DataRequest = {
          page: readPage(this.key, initialMap),
          sort: readSort(this.key, initialMap),
          filter: readFilter(this.key, initialMap)
        };
        this.initialized$.next(request);
      } else {
        this.initialized$.next(undefined);
      }
      this.readSub = this.activatedRoute.queryParamMap.pipe(skip(1)).subscribe((paramMap) => {
        const request: DataRequest = {
          page: readPage(this.key, paramMap),
          sort: readSort(this.key, paramMap),
          filter: readFilter(this.key, paramMap)
        };
        this.savedRequest$.next(request);
      });
    });
  }

  ngOnDestroy(): void {
    this.saveRequest$.complete();
    this.savedRequest$.complete();

    this.readSub.unsubscribe();
    this.saveSub.unsubscribe();
  }
}
