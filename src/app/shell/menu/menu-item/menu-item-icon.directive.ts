import { ChangeDetectorRef, Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CollapsibleMenuDirective } from './collapsible-menu.directive';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[hrhMenuItemIcon]'
})
export class MenuItemIconDirective implements OnInit, OnDestroy {
  @HostBinding('style.margin-right.px')
  marginRight = 0;

  private collapseSub = Subscription.EMPTY;

  constructor(private readonly collapsibleMenu: CollapsibleMenuDirective, private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.collapseSub = this.collapsibleMenu.collapsed$.pipe().subscribe((collapsed) => {
      this.marginRight = collapsed ? 0 : 8;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.collapseSub.unsubscribe();
  }
}
