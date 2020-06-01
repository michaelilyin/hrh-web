import { Injectable } from '@angular/core';
import { HttpClient, HttpDownloadProgressEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, defaultIfEmpty, filter, map, scan, startWith, switchMap } from 'rxjs/operators';

export interface QueryParams {
  [p: string]: string | string[];
}

interface ScanValue<T> {
  all: T[];
  new: T[];
}

@Injectable({
  providedIn: 'root'
})
export class HttpStreamService {
  constructor(private readonly http: HttpClient) {}

  get<T>(url: string): Observable<T>;
  get<T>(url: string, repeat: true, query?: QueryParams): Observable<readonly T[]>;
  get<T>(url: string, repeat: boolean = false, query?: QueryParams): Observable<T | readonly T[]> {
    const params = new HttpParams({
      fromObject: query ?? {}
    });
    const options = { observe: 'events', responseType: 'text', reportProgress: true, params };
    const partial$: Observable<ScanValue<T>> = this.http
      .get<string>(
        url,
        // tslint:disable-next-line:no-any
        options as any
      )
      .pipe(
        // @ts-ignore
        filter((r) => r.type === HttpEventType.DownloadProgress),
        map((event: HttpDownloadProgressEvent) => {
          return event.partialText ?? '';
        }),
        debounceTime(100),
        scan(
          (acc: ScanValue<T>, value: string) => {
            const newJson = value
              .split('\n')
              .filter((l) => l.trim().length > 0)
              .slice(acc.all.length);
            const newItems = newJson.map((json) => JSON.parse(json) as T);
            return {
              all: acc.all.concat(...newItems),
              new: newItems
            };
          },
          {
            all: [],
            new: []
          } as ScanValue<T>
        )
      );

    if (repeat) {
      return partial$.pipe(
        defaultIfEmpty({
          all: [] as T[],
          new: [] as T[]
        }),
        map((value) => value.all)
      );
    }
    return partial$.pipe(switchMap((value) => of(...value.new)));
  }
}
