import { Observable, ReplaySubject } from 'rxjs';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';
import { Paginator } from '@hrh/sdk/data/commons/pagination/paginator.model';
import { Sorter } from '@hrh/sdk/data/commons/sorter.model';
import { Filter } from '@hrh/sdk/data/commons/filter.model';
import { Store } from '@hrh/sdk/data/store/store.model';
import { DataSourcePostProcessor } from '@hrh/sdk/data/commons/post-processing/post-processor.model';

export abstract class DataSource<T> {
  abstract readonly paginator: Paginator;
  abstract readonly sorter: Sorter;
  abstract readonly filter: Filter;
  abstract readonly querying$: Observable<boolean>;

  protected readonly refresh$ = new ReplaySubject<void>(1);

  refresh(): void {
    this.refresh$.next();
  }

  abstract registerPostProcessor(name: string, postProcessor: DataSourcePostProcessor<T>): void;
  abstract unregisterPostProcessor(name: string): void;
}
