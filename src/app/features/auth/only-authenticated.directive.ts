import { ChangeDetectorRef, Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[hrhOnlyAuthenticated]'
})
export class OnlyAuthenticatedDirective implements OnInit, OnDestroy {
  private view?: ViewRef;

  private authSub = Subscription.EMPTY;

  constructor(
    private readonly templateRef: TemplateRef<void>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly authService: AuthService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.auth$.subscribe((auth) => {
      if (auth.authenticated) {
        if (this.view == undefined) {
          this.view = this.viewContainerRef.createEmbeddedView(this.templateRef);
          this.cd.markForCheck();
        }
      } else {
        if (this.view != undefined) {
          this.view.destroy();
          this.cd.markForCheck();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.viewContainerRef.clear();
  }
}
