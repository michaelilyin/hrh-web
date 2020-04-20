import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@hrh/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hrh-anonymous-dashboard',
  templateUrl: './anonymous-dashboard.component.html',
  styleUrls: ['./anonymous-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnonymousDashboardComponent implements OnInit, OnDestroy {
  private sub = Subscription.EMPTY;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.auth$.subscribe((auth) => {
      if (auth.authenticated) {
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
