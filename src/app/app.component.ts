import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TestHttpService } from './core/services/test-http.service';
import { OAuthInfoEvent, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'hrh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'hrh';
  profile = 'Unauthorized';

  readonly test$ = this.testHttpService.getTest();

  constructor(
    public readonly testHttpService: TestHttpService,
    private readonly authService: OAuthService,
    private cd: ChangeDetectorRef,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    // Automatically load user profile
    this.authService.events
      .pipe(
        filter((e) => {
          if (
            e.type === 'discovery_document_loaded' &&
            (e as OAuthInfoEvent).info != undefined &&
            this.authService.hasValidAccessToken()
          ) {
            return true;
          }
          return e.type === 'token_received';
        })
      )
      .subscribe((_) => {
        // tslint:disable-next-line:no-console
        console.info('state', this.authService.state);
        this.authService.loadUserProfile().then((profile) => {
          console.warn('profile', profile);
          const pr = profile as { preferred_username: string };
          this.profile = pr.preferred_username;
          this.cd.markForCheck();
        });
      });

    // Display all events
    this.authService.events.subscribe((e) => {
      // tslint:disable-next-line:no-console
      console.info('oauth/oidc event', e);
    });

    // if (this.platform.isBrowser) {
    this.authService.loadDiscoveryDocumentAndTryLogin().then((e) => {});
    // }
  }

  login() {
    this.authService.initLoginFlow();
  }

  logout() {
    this.authService.logOut();
  }
}
