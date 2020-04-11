import { Directive, EmbeddedViewRef, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Directive({
  selector: '[hrhOnlyBrowser]'
})
export class OnlyBrowserDirective implements OnInit, OnDestroy {
  private view?: EmbeddedViewRef<void>;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<void>,
    private readonly platform: Platform
  ) {}

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this.view = this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  ngOnDestroy(): void {
    this.viewContainerRef.clear();
  }
}
