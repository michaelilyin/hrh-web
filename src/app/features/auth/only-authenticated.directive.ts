import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
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
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.auth$.subscribe((auth) => {
      if (auth.authenticated) {
        if (this.view == undefined) {
          this.view = this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        if (this.view != undefined) {
          this.view.destroy();
          this.view = undefined;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.view?.destroy();
    this.view = undefined;
  }
}
