import { Directive, EmbeddedViewRef, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideMenuComponent } from '@hrh/side-menu/side-menu/side-menu.component';

@Directive({
  selector: '[hrhSidenavExpandedContent]'
})
export class SidenavExpandedContentDirective implements OnInit, OnDestroy {
  private sub = Subscription.EMPTY;
  private viewRef?: EmbeddedViewRef<void>;

  constructor(
    private readonly templateRef: TemplateRef<void>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly sideMenuComponent: SideMenuComponent
  ) {}

  ngOnInit(): void {
    this.sub = this.sideMenuComponent.expanded$.subscribe((expanded) => {
      if (expanded) {
        if (this.viewRef == undefined) {
          this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        if (this.viewRef != undefined) {
          this.viewRef.destroy();
          this.viewRef = undefined;
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
