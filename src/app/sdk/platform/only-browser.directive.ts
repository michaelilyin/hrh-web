import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: '[hrhOnlyBrowser]'
})
export class OnlyBrowserDirective implements OnInit, OnDestroy {
  @Input() else?: TemplateRef<void> | 'spinner';

  private view?: EmbeddedViewRef<void>;
  private component?: ComponentRef<MatSpinner>;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<void>,
    private readonly platform: Platform,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this.view = this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (this.else != undefined) {
      if (this.else === 'spinner') {
        const spinnerFactory = this.componentFactoryResolver.resolveComponentFactory(MatSpinner);
        this.component = this.viewContainerRef.createComponent(spinnerFactory);
        this.component.instance.color = 'accent';
        this.component.instance.diameter = 25;

        this.renderer.addClass(this.component.instance._elementRef.nativeElement, 'ssr-spinner');
        this.component.changeDetectorRef.markForCheck();
      } else {
        this.view = this.viewContainerRef.createEmbeddedView(this.else);
      }
    }
  }

  ngOnDestroy(): void {
    this.viewContainerRef.clear();
  }
}
