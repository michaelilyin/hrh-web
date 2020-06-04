import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@hrh/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';

const demoCreds = [
  {
    username: 'john.doe@hrh.ru',
    password: 'J0hnD0eHRH',
    role: 'House Administrator'
  },
  {
    username: 'jane.doe@hrh.ru',
    password: 'JaneD0eHRH',
    role: 'House Administrator'
  }
];

@Component({
  selector: 'hrh-anonymous-dashboard',
  templateUrl: './anonymous-dashboard.component.html',
  styleUrls: ['./anonymous-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnonymousDashboardComponent implements OnInit, OnDestroy {
  readonly demoCreds = demoCreds;

  private sub = Subscription.EMPTY;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly clipboard: Clipboard,
    private readonly notificationsService: NotificationsService
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

  copy(content: string) {
    this.clipboard.copy(content);
    this.notificationsService.success('Copied!');
  }
}
