import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TestHttpService } from '../../core/services/test-http.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Platform } from '@angular/cdk/platform';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'hrh-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit {
  readonly test$ = this.testHttpService.getTest();

  constructor(private readonly testHttpService: TestHttpService) {}

  ngOnInit(): void {}
}
