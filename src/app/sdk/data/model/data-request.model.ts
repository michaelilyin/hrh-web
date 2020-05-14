import { Observable } from 'rxjs';

// tslint:disable-next-line:no-empty-interface
export interface DataRequest {}

export interface DataResponse<T> {
  items: ReadonlyArray<T>;
}

export type FetchFn<T> = (request: DataRequest) => Observable<DataResponse<T>>;
