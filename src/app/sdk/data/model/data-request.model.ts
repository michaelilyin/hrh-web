import { Observable } from 'rxjs';
import { SortField } from '@hrh/sdk/data/commons/sorter.model';
import { FilterFields } from '@hrh/sdk/data/commons/filter.model';

export interface PageRequest {
  offset: number;
  limit: number;
}

export interface SortRequest {
  fields: ReadonlyArray<SortField>;
}

export interface FilterRequest<F extends FilterFields = FilterFields> {
  fields: F;
}

// tslint:disable-next-line:no-empty-interface
export interface DataRequest<F extends FilterFields = FilterFields> {
  page: PageRequest;
  sort: SortRequest;
  filter: FilterRequest<F>;
}

export interface DataResponse<T> {
  items: ReadonlyArray<T>;
  total: number;
}

export type FetchFn<T, F extends FilterFields = FilterFields> = (
  request: DataRequest<F>
) => Observable<DataResponse<T>>;

export interface WrappedResponse<T> {
  request: DataRequest;
  response: DataResponse<T>;
}
