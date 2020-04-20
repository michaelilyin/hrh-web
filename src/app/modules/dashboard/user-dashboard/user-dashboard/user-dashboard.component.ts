import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@hrh/auth/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrh-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  private sub = Subscription.EMPTY;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.auth$.subscribe((auth) => {
      if (!auth.authenticated) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          replaceUrl: true
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
