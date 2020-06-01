import { filter } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';

export function filterDefined<T>(): OperatorFunction<T | undefined | null, T> {
  return filter<T>((v) => v != undefined) as OperatorFunction<T | undefined | null, T>;
}
