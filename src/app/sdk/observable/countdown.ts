import { interval, Observable } from 'rxjs';
import { map, shareReplay, startWith, take } from 'rxjs/operators';

export function countdown(values: number): Observable<number> {
  return interval(1000).pipe(
    take(values),
    map((tick) => values - 1 - tick),
    startWith(values),
    shareReplay(1)
  );
}
