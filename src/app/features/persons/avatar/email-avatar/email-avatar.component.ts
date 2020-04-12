import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import * as md5 from 'md5';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'hrh-email-avatar',
  templateUrl: './email-avatar.component.html',
  styleUrls: ['./email-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailAvatarComponent implements OnInit {
  @Input() email?: string;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  // tslint:disable-next-line:no-unsafe-any
  @HostBinding('style.background-image')
  get url(): SafeStyle {
    const url = `url(https://www.gravatar.com/avatar/${md5(this.email?.toLowerCase() ?? '')}?d=mp)`;
    return this.domSanitizer.bypassSecurityTrustStyle(url);
  }
}
