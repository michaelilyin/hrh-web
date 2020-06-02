import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@hrh/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';
import * as moment from 'moment';
import * as tz from 'moment-timezone';
import { DateTime, Info, Zone } from 'luxon';

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

  time = '2020-05-29T06:56:34Z';

  mtime = moment(this.time).format('hh:mm A MM/DD/YYYY Z ZZ');

  mtimeest = tz.utc(this.time).tz('EST').format('hh:mm A MM/DD/YYYY Z ZZ');
  mtimeedt = tz.utc(this.time).tz('EDT').format('hh:mm A MM/DD/YYYY Z ZZ');
  mtimeestsdt = tz.utc(this.time).tz('EDT/EDT').format('hh:mm A MM/DD/YYYY Z ZZ');
  mtimeam = tz.utc(this.time).tz('America/New_York').format('hh:mm A MM/DD/YYYY Z ZZ');

  luxon = DateTime.fromISO(this.time).toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ');
  luxonam = DateTime.fromISO(this.time).setZone('America/New_York').toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ');
  luxonest = DateTime.fromISO(this.time).setZone('EST').toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ');
  luxonedt = DateTime.fromISO(this.time).setZone('EDT').toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ');
  luxonestedt = DateTime.fromISO(this.time).setZone('EST/EDT').toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ');

  luxonamfn = DateTime.fromISO(this.time).toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ', {
    timeZoneName: 'America/New_York'
  });
  luxonestfn = DateTime.fromISO(this.time).toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ', {
    timeZoneName: 'EST'
  });
  luxonedtfn = DateTime.fromISO(this.time).toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ', {
    timeZoneName: 'EDT'
  });
  luxonestedtfn = DateTime.fromISO(this.time).toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ', {
    timeZoneName: 'EST/EDT'
  });

  luxonamftz = DateTime.fromISO(this.time).toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ', {
    timeZone: 'America/New_York'
  });
  luxonestftz = DateTime.fromISO(this.time).toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ', {
    timeZone: 'EST'
  });
  luxonedtftz = DateTime.fromISO(this.time).toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ', {
    timeZone: 'EDT'
  });
  luxonestedtftz = DateTime.fromISO(this.time).toFormat('hh:mm a MM/dd/yyyy z ZZZZ ZZZZZ', {
    timeZone: 'EST/EDT'
  });

  est = Info.normalizeZone('EST');
  edt = Info.normalizeZone('EDT');
  estedt = Info.normalizeZone('EST/EDT');
  ny = Info.normalizeZone('America/New_York');

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
