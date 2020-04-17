import { Directive, EmbeddedViewRef, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { CollapsibleMenuDirective } from './collapsible-menu.directive';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[hrhMenuItemContent]'
})
export class MenuItemContentDirective implements OnInit, OnDestroy {
  private sub = Subscription.EMPTY;
  private viewRef?: EmbeddedViewRef<void>;

  constructor(
    private readonly templateRef: TemplateRef<void>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly collapsibleMenu: CollapsibleMenuDirective
  ) {}

  ngOnInit(): void {
    this.sub = this.collapsibleMenu.collapsed$.subscribe((collapsed) => {
      if (collapsed) {
        if (this.viewRef != undefined) {
          this.viewRef.destroy();
          this.viewRef = undefined;
        }
      } else {
        if (this.viewRef == undefined) {
          this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.viewRef?.destroy();
    this.viewRef = undefined;
  }
}
