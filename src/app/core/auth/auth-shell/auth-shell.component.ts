import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'hrh-auth-shell',
  templateUrl: './auth-shell.component.html',
  styleUrls: ['./auth-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthShellComponent implements OnInit {
  constructor(private readonly platform: Platform) {}

  ngOnInit(): void {}

  get isBrowser(): boolean {
    return this.platform.isBrowser;
  }
}
