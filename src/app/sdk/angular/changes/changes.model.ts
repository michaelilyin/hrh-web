import { SimpleChange, SimpleChanges } from '@angular/core';

export declare class Change<T> extends SimpleChange {
  previousValue: T | undefined;
  currentValue: T | undefined;
  firstChange: boolean;
}

export type Changes<T> = SimpleChanges & { [P in keyof T]?: Change<T[P]> };
