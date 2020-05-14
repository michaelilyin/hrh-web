import { DataResponse } from '@hrh/sdk/data/model/data-request.model';

export interface Page<T> {
  items: ReadonlyArray<T>;
}

export function pageOf<T>(...items: T[]): Page<T> {
  return {
    items
  };
}

export function pageToResponse<T>(page: Page<T>): DataResponse<T> {
  return {
    items: page.items
  };
}
