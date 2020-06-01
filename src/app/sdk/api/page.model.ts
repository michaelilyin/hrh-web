import { DataResponse } from '@hrh/sdk/data/model/data-request.model';

export interface Page<T> {
  items: ReadonlyArray<T>;
  total: number;
}

export function pageOf<T>(...items: T[]): Page<T> {
  return {
    items,
    total: items.length
  };
}

export function pageToResponse<T>(page: Page<T>): DataResponse<T> {
  return {
    items: page.items,
    total: page.total
  };
}

export function streamToResponse<T extends HasPageInfo>(items: readonly T[]): DataResponse<T> {
  return {
    items,
    total: items[0]?._page?.total ?? 0
  };
}

export interface ItemPageInfo {
  total: number;
}

export interface HasPageInfo {
  _page: ItemPageInfo;
}
