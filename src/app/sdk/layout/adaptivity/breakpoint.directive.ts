import { BreakpointService } from '@hrh/sdk/layout/adaptivity/breakpoint.service';
import { BreakpointName } from '@hrh/sdk/layout/adaptivity/breakpoint.model';
import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class BreakpointDirective implements OnInit, OnDestroy {
  private sub = Subscription.EMPTY;

  private viewRef?: ViewRef;

  constructor(
    private readonly bp: BreakpointName,
    private readonly breakpointService: BreakpointService,
    private readonly templateRef: TemplateRef<void>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.sub = this.breakpointService.current$.subscribe((mode) => {
      if (mode.has(this.bp)) {
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
  }
}

@Directive({
  selector: '[hrhOnlyHandset]'
})
export class OnlyHandsetDirective extends BreakpointDirective {
  constructor(
    breakpointService: BreakpointService,
    templateRef: TemplateRef<void>,
    viewContainerRef: ViewContainerRef
  ) {
    super(BreakpointName.Handset, breakpointService, templateRef, viewContainerRef);
  }
}

@Directive({
  selector: '[hrhOnlyTablet]'
})
export class OnlyTabletDirective extends BreakpointDirective {
  constructor(
    breakpointService: BreakpointService,
    templateRef: TemplateRef<void>,
    viewContainerRef: ViewContainerRef
  ) {
    super(BreakpointName.Tablet, breakpointService, templateRef, viewContainerRef);
  }
}

@Directive({
  selector: '[hrhOnlyWeb]'
})
export class OnlyWebDirective extends BreakpointDirective {
  constructor(
    breakpointService: BreakpointService,
    templateRef: TemplateRef<void>,
    viewContainerRef: ViewContainerRef
  ) {
    super(BreakpointName.Web, breakpointService, templateRef, viewContainerRef);
  }
}
