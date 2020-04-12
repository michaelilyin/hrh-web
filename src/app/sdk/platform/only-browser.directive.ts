import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CssOnlySpinnerComponent } from './css-only-spinner/css-only-spinner.component';

@Directive({
  selector: '[hrhOnlyBrowser]'
})
export class OnlyBrowserDirective implements OnInit, OnDestroy {
  @Input() else?: TemplateRef<void> | 'spinner';

  private view?: EmbeddedViewRef<void>;
  private component?: ComponentRef<CssOnlySpinnerComponent>;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<void>,
    private readonly platform: Platform,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this.view = this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (this.else != undefined) {
      if (typeof this.else === 'string') {
        const spinnerFactory = this.componentFactoryResolver.resolveComponentFactory(CssOnlySpinnerComponent);
        this.component = this.viewContainerRef.createComponent(spinnerFactory);
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
