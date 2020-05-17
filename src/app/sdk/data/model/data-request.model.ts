import { Observable } from 'rxjs';

export interface PageRequest {
  offset: number;
  limit: number;
}

// tslint:disable-next-line:no-empty-interface
export interface DataRequest {
  page: PageRequest;
}

export interface DataResponse<T> {
  items: ReadonlyArray<T>;
  total: number;
}

export type FetchFn<T> = (request: DataRequest) => Observable<DataResponse<T>>;
