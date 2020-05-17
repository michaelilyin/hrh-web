import { Observable } from 'rxjs';
import { FieldSort } from '@hrh/sdk/data/commons/ds.model';

export interface PageRequest {
  offset: number;
  limit: number;
}

export interface SortRequest {
  fields: ReadonlyArray<FieldSort>;
}

// tslint:disable-next-line:no-empty-interface
export interface DataRequest {
  page: PageRequest;
  sort: SortRequest;
}

export interface DataResponse<T> {
  items: ReadonlyArray<T>;
  total: number;
}

export type FetchFn<T> = (request: DataRequest) => Observable<DataResponse<T>>;
