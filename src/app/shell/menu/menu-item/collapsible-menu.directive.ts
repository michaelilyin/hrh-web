import { Directive, Input, OnChanges } from '@angular/core';
import { Changes } from '@hrh/sdk/angular/changes/changes.model';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Directive({
  selector: '[hrhCollapsibleMenu]'
})
export class CollapsibleMenuDirective implements OnChanges {
  @Input() collapsed = false;

  private _collapsed$ = new BehaviorSubject<boolean>(this.collapsed);

  readonly collapsed$ = this._collapsed$.asObservable();

  constructor() {}

  ngOnChanges(changes: Changes<this>): void {
    if (changes.collapsed) {
      this._collapsed$.next(changes.collapsed.currentValue ?? false);
    }
  }
}
