import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[hrhMenuItemIcon]'
})
export class MenuItemIconDirective {
  @HostBinding('style.padding-right.px')
  readonly paddingRight = 8;

  constructor() {}
}
